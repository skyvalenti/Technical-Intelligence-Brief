"""
Pytest suite for Pydantic schema validation.
"""
import pytest
from pydantic import ValidationError

from src.schemas import (
    SkyTechnicalIntelligenceReport,
    MetricDetail,
    Metrics,
    ArxivPaperItem,
    SecurityAdvisoryItem,
    CompoundImpactItem,
    LinkItem
)


def test_metric_detail_valid():
    m = MetricDetail(level="SEV-1: NOMINAL", driver="Stable API schemas", value=15)
    assert m.value == 15
    assert m.level == "SEV-1: NOMINAL"


def test_metric_detail_invalid_range():
    with pytest.raises(ValidationError):
        MetricDetail(level="SEV-1", driver="Over range", value=150)
    with pytest.raises(ValidationError):
        MetricDetail(level="SEV-1", driver="Under range", value=-5)


def test_arxiv_paper_valid():
    p = ArxivPaperItem(
        arxiv_id="2502.14890",
        title="Continuous Normalization in Neural Radiance Relighting",
        categories=["cs.GR", "cs.CV"],
        summary="Novel reconstruction algorithm for neural implicit rendering.",
        authors=["Alice", "Bob"],
        url="https://arxiv.org/abs/2502.14890"
    )
    assert p.arxiv_id == "2502.14890"
    assert "cs.GR" in p.categories


def test_security_advisory_valid():
    s = SecurityAdvisoryItem(
        cve_id="CVE-2026-21804",
        severity="MEDIUM",
        score=5.8,
        component="OpenEXR",
        summary="Out-of-bounds read during decompression.",
        advisory_url="https://nvd.nist.gov/vuln/detail/CVE-2026-21804"
    )
    assert s.score == 5.8
    assert s.cve_id.startswith("CVE-")


def test_security_advisory_invalid_score():
    with pytest.raises(ValidationError):
        SecurityAdvisoryItem(
            cve_id="CVE-2026-9999",
            severity="CRITICAL",
            score=15.0,  # Max CVSS is 10.0
            component="Core",
            summary="Bad score",
            advisory_url="https://nvd.nist.gov"
        )


def test_full_report_validation():
    report_data = {
        "dispatch_id": "SKY-TIB-2026.08.W34",
        "cadence": "Weekly Intelligence Run",
        "status": "Nominal / Validated",
        "sector": "3D PLATFORMS / SCIENTIFIC COMPUTING",
        "metrics": {
            "sev_1": {"level": "SEV-1: NOMINAL", "driver": "Driver A", "value": 10},
            "opp_1": {"level": "OPP-1: HIGH", "driver": "Driver B", "value": 80},
            "sev_2": {"level": "SEV-2: NOMINAL", "driver": "Driver C", "value": 20},
            "opp_2": {"level": "OPP-2: NOMINAL", "driver": "Driver D", "value": 90}
        },
        "compound_impact_analysis": [
            {
                "vector": "Neural Meshing + ZeroGPU",
                "synthesis": "Enables zero-cost reconstruction in viewport pipelines.",
                "links": [{"title": "OpenUSD", "url": "https://openusd.org"}]
            }
        ]
    }
    report = SkyTechnicalIntelligenceReport.model_validate(report_data)
    assert report.dispatch_id == "SKY-TIB-2026.08.W34"
    assert len(report.compound_impact_analysis) == 1


def test_full_report_invalid_dispatch_id():
    report_data = {
        "dispatch_id": "INVALID-ID-1234",
        "metrics": {
            "sev_1": {"level": "SEV-1", "driver": "A", "value": 10},
            "opp_1": {"level": "OPP-1", "driver": "B", "value": 80},
            "sev_2": {"level": "SEV-2", "driver": "C", "value": 20},
            "opp_2": {"level": "OPP-2", "driver": "D", "value": 90}
        }
    }
    with pytest.raises(ValidationError):
        SkyTechnicalIntelligenceReport.model_validate(report_data)
