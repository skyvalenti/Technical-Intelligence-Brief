"""
Vector Cosine Filter & Semantic Deduplication Engine.
Computes tokenized vector embeddings and cosine similarity between incoming
intelligence records and historical archives to eliminate duplicate reporting.
"""
import re
import math
import hashlib
from typing import List, Dict, Set, Tuple, Any, Optional


def tokenize(text: str) -> List[str]:
    """Tokenize and normalize text into clean lowercase alpha-numeric terms."""
    if not text:
        return []
    # Strip URLs and formatting characters
    cleaned = re.sub(r"https?://\S+|[^\w\s]", " ", text.lower())
    tokens = [w for w in cleaned.split() if len(w) > 2]
    # Simple stopwords filtering
    stopwords = {
        "the", "and", "for", "with", "this", "that", "from", "are", "was",
        "were", "will", "has", "have", "had", "using", "used", "into", "our",
        "via", "over", "under", "which", "more", "most", "than", "been"
    }
    return [t for t in tokens if t not in stopwords]


def build_tf_vector(tokens: List[str]) -> Dict[str, float]:
    """Build term-frequency vector from token list."""
    if not tokens:
        return {}
    tf: Dict[str, float] = {}
    for t in tokens:
        tf[t] = tf.get(t, 0.0) + 1.0
    # Normalize by token count
    total = float(len(tokens))
    return {k: v / total for k, v in tf.items()}


def cosine_similarity(vec1: Dict[str, float], vec2: Dict[str, float]) -> float:
    """Compute cosine similarity between two sparse term-frequency vectors."""
    if not vec1 or not vec2:
        return 0.0
    common_terms = set(vec1.keys()).intersection(set(vec2.keys()))
    if not common_terms:
        return 0.0
    
    dot_product = sum(vec1[t] * vec2[t] for t in common_terms)
    mag1 = math.sqrt(sum(v * v for v in vec1.values()))
    mag2 = math.sqrt(sum(v * v for v in vec2.values()))
    
    if mag1 == 0.0 or mag2 == 0.0:
        return 0.0
    return dot_product / (mag1 * mag2)


def compute_content_hash(title: str, body: str = "") -> str:
    """Compute deterministic SHA256 signature for exact record matching."""
    normalized = f"{title.strip().lower()}::{body.strip().lower()}"
    return hashlib.sha256(normalized.encode("utf-8")).hexdigest()


class VectorDeduplicator:
    """
    Vector Cosine similarity filter for incoming intelligence feeds.
    Maintains an in-memory vector index of processed records and rejects
    duplicates exceeding the cosine similarity threshold.
    """
    def __init__(self, similarity_threshold: float = 0.80):
        self.similarity_threshold = similarity_threshold
        self.seen_hashes: Set[str] = set()
        self.corpus_vectors: List[Tuple[str, Dict[str, float]]] = []

    def is_duplicate(self, title: str, summary: str = "", identifier: Optional[str] = None) -> bool:
        """
        Check if an entry is a duplicate based on exact hash or vector cosine similarity.
        """
        chash = compute_content_hash(title, summary)
        if chash in self.seen_hashes:
            return True
        
        full_text = f"{title} {summary}"
        tokens = tokenize(full_text)
        if not tokens:
            return False
        
        vec = build_tf_vector(tokens)
        
        for record_id, existing_vec in self.corpus_vectors:
            sim = cosine_similarity(vec, existing_vec)
            if sim >= self.similarity_threshold:
                return True
        
        # If identifier matches any known identifier
        if identifier and any(r_id == identifier for r_id, _ in self.corpus_vectors if r_id):
            return True

        return False

    def register(self, title: str, summary: str = "", identifier: Optional[str] = None) -> None:
        """
        Register a record into the vector index.
        """
        chash = compute_content_hash(title, summary)
        self.seen_hashes.add(chash)
        
        full_text = f"{title} {summary}"
        tokens = tokenize(full_text)
        vec = build_tf_vector(tokens)
        self.corpus_vectors.append((identifier or chash, vec))

    def filter_records(self, records: List[Dict[str, Any]], title_key: str = "title", summary_key: str = "summary") -> List[Dict[str, Any]]:
        """
        Filter a list of record dicts, preserving unique records in order.
        """
        unique_records = []
        for r in records:
            title = r.get(title_key, "")
            summary = r.get(summary_key, "") or r.get("detail", "") or r.get("synthesis", "")
            ident = r.get("arxiv_id") or r.get("cve_id") or r.get("url")
            
            if not self.is_duplicate(title, summary, identifier=ident):
                self.register(title, summary, identifier=ident)
                unique_records.append(r)
        return unique_records
