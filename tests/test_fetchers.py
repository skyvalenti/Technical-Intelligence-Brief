"""
Pytest suite for upstream intelligence fetchers.
"""
import pytest
from unittest.mock import patch, MagicMock

from src.fetchers import ArxivFetcher, SecurityAdvisoryFetcher, fetch_all_intelligence


SAMPLE_ARXIV_XML = """<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:arxiv="http://arxiv.org/schemas/atom">
  <entry>
    <id>http://arxiv.org/abs/2602.99999v1</id>
    <published>2026-02-20T10:00:00Z</published>
    <title>Hybrid Mesh Gaussian Splatting for Real-Time Viewports</title>
    <summary>We introduce a real-time ray-traced Gaussian representation with USD schema export.</summary>
    <author><name>Dr. Alex Vance</name></author>
    <category term="cs.GR" />
    <category term="cs.CV" />
  </entry>
</feed>
"""


def test_arxiv_fetcher_parse_xml():
    fetcher = ArxivFetcher()
    papers = fetcher._parse_arxiv_feed(SAMPLE_ARXIV_XML)
    
    assert len(papers) == 1
    assert papers[0].arxiv_id == "2602.99999v1"
    assert "Hybrid Mesh Gaussian Splatting" in papers[0].title
    assert "cs.GR" in papers[0].categories
    assert "Dr. Alex Vance" in papers[0].authors


def test_arxiv_fetcher_fallback_on_network_error():
    fetcher = ArxivFetcher(timeout=1)
    
    with patch("requests.get", side_effect=Exception("Connection timed out")):
        papers = fetcher.fetch_papers()
        assert len(papers) > 0
        assert papers[0].arxiv_id.startswith("250")


def test_security_advisories_fetcher():
    sec_fetcher = SecurityAdvisoryFetcher()
    advisories = sec_fetcher.fetch_advisories()
    
    assert len(advisories) >= 2
    for adv in advisories:
        assert adv.cve_id.startswith("CVE-")
        assert adv.severity in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]


def test_fetch_all_intelligence_structure():
    data = fetch_all_intelligence(timeout=2)
    assert "arxiv_research" in data
    assert "security_advisories" in data
    assert len(data["arxiv_research"]) > 0
    assert len(data["security_advisories"]) > 0
