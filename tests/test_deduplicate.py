"""
Pytest suite for Vector Cosine Semantic Deduplication engine.
"""
from src.deduplicate import (
    VectorDeduplicator,
    tokenize,
    build_tf_vector,
    cosine_similarity,
    compute_content_hash,
)


def test_tokenize_basic():
    tokens = tokenize("OpenUSD Hydra Render Delegate 2.0 with Vulkan!")
    assert "openusd" in tokens
    assert "hydra" in tokens
    assert "render" in tokens
    assert "with" not in tokens  # Stopword removed


def test_tokenize_empty():
    assert tokenize("") == []
    assert tokenize("   ") == []


def test_cosine_similarity_identical():
    v1 = build_tf_vector(["openusd", "hydra", "vulkan"])
    v2 = build_tf_vector(["openusd", "hydra", "vulkan"])
    sim = cosine_similarity(v1, v2)
    assert abs(sim - 1.0) < 1e-5


def test_cosine_similarity_orthogonal():
    v1 = build_tf_vector(["openusd", "hydra"])
    v2 = build_tf_vector(["blockchain", "ethereum"])
    sim = cosine_similarity(v1, v2)
    assert sim == 0.0


def test_deduplicator_exact_hash_match():
    dedup = VectorDeduplicator(similarity_threshold=0.80)
    title = "Neural Radiance Relighting for Production Viewports"
    summary = "Fast evaluation using CUDA kernels."
    
    assert not dedup.is_duplicate(title, summary)
    dedup.register(title, summary)
    assert dedup.is_duplicate(title, summary)


def test_deduplicator_semantic_similarity_match():
    dedup = VectorDeduplicator(similarity_threshold=0.75)
    
    title1 = "Continuous Normalization in Neural Radiance Relighting"
    summary1 = "Presents exact gradient reconstruction for hybrid multi-bounce radiance caching across real-time neural viewport delegates."
    dedup.register(title1, summary1)

    # Near identical / paraphrased entry
    title2 = "Continuous Normalization for Neural Radiance Relighting Viewports"
    summary2 = "Presents exact gradient reconstruction for hybrid radiance caching across neural viewport delegates."
    
    assert dedup.is_duplicate(title2, summary2)


def test_deduplicator_distinct_entries():
    dedup = VectorDeduplicator(similarity_threshold=0.75)
    
    title1 = "Continuous Normalization in Neural Radiance Relighting"
    summary1 = "Presents exact gradient reconstruction for hybrid multi-bounce radiance caching."
    dedup.register(title1, summary1)

    title2 = "ZeroGPU Serverless Quotas and H100 Cluster Allocations"
    summary2 = "Monitoring developer compute thresholds and cost avoidance policies."
    
    assert not dedup.is_duplicate(title2, summary2)


def test_filter_records_preserves_order():
    dedup = VectorDeduplicator(similarity_threshold=0.80)
    records = [
        {"title": "USD 25.02 Release", "summary": "Hydra delegate fixes."},
        {"title": "USD 25.02 Release", "summary": "Hydra delegate fixes."},  # Duplicate
        {"title": "MaterialX WGSL Support", "summary": "WebGPU shader graph compiler."}
    ]
    filtered = dedup.filter_records(records)
    assert len(filtered) == 2
    assert filtered[0]["title"] == "USD 25.02 Release"
    assert filtered[1]["title"] == "MaterialX WGSL Support"
