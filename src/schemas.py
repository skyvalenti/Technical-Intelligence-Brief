"""
Pydantic schemas for the automated intelligence pipeline.
Provides deterministic validation for research papers, security disclosures,
operational metrics, and compiled telemetry reports.
"""
from typing import List, Dict, Optional, Any
from datetime import datetime
from pydantic import BaseModel, Field, field_validator, ConfigDict


class MetricDetail(BaseModel):
    level: str = Field(..., description="Severity level or descriptor, e.g. SEV-1: NOMINAL")
    driver: str = Field(..., description="Contextual primary driver for the metric score")
    value: int = Field(..., ge=0, le=100, description="Metric percentage value between 0 and 100")


class Metrics(BaseModel):
    sev_1: MetricDetail
    opp_1: MetricDetail
    sev_2: MetricDetail
    opp_2: MetricDetail


class LinkItem(BaseModel):
    title: Optional[str] = "Source"
    label: Optional[str] = None
    url: str

    model_config = ConfigDict(extra="ignore")


class CompoundImpactItem(BaseModel):
    vector: str
    synthesis: str
    links: List[LinkItem] = Field(default_factory=list)


class ExecutiveBriefItem(BaseModel):
    tag: str
    title: str
    severity: str
    detail: str
    link: Optional[Any] = None


class ImpactMatrixItem(BaseModel):
    sector: str
    vector: str
    rating: str
    consequence: str
    source_url: Optional[str] = None


class ResearchTelemetryItem(BaseModel):
    domain: str
    title: str
    severity: str
    specs: Dict[str, str] = Field(default_factory=dict)
    lineage: List[str] = Field(default_factory=list)
    url: str


class InfrastructureWatchItem(BaseModel):
    domain: str
    entity: str
    rating: str
    specs: Dict[str, str] = Field(default_factory=dict)
    governance: str = "ASWF / Open Source"
    url: str


class ComputeMatrixItem(BaseModel):
    platform: str
    allocation: str
    tte: str
    threshold: str
    url: str


class GrantsTalentItem(BaseModel):
    title: str
    rating: str
    detail: str
    url: str


class TalkingPointItem(BaseModel):
    audience: str
    script: str


class SecurityAdvisoryItem(BaseModel):
    cve_id: str = Field(..., description="CVE identifier, e.g., CVE-2026-1234")
    severity: str = Field(..., description="Severity rating: CRITICAL, HIGH, MEDIUM, LOW")
    score: Optional[float] = Field(None, ge=0.0, le=10.0, description="CVSS v3/v4 score")
    component: str = Field(..., description="Affected package or component")
    summary: str = Field(..., description="Description of the vulnerability")
    advisory_url: str = Field(..., description="Link to NVD / vendor advisory")


class ArxivPaperItem(BaseModel):
    arxiv_id: str = Field(..., description="arXiv identifier, e.g. 2403.11200")
    title: str = Field(..., description="Paper title")
    categories: List[str] = Field(default_factory=list, description="Primary and secondary categories")
    summary: str = Field(..., description="Paper abstract snippet")
    authors: List[str] = Field(default_factory=list)
    url: str = Field(..., description="arXiv abstract/pdf link")
    published_date: Optional[str] = None


class SkyTechnicalIntelligenceReport(BaseModel):
    dispatch_id: str
    cadence: str = "Weekly Intelligence Run"
    status: str = "Active / Validated"
    sector: str = "3D PLATFORMS / SCIENTIFIC COMPUTING / GRAPHICS PIPELINES"
    generated_at: Optional[str] = None
    metrics: Metrics
    compound_impact_analysis: List[CompoundImpactItem] = Field(default_factory=list)
    executive_brief: List[ExecutiveBriefItem] = Field(default_factory=list)
    impact_matrix: List[ImpactMatrixItem] = Field(default_factory=list)
    research_telemetry: List[ResearchTelemetryItem] = Field(default_factory=list)
    infrastructure_watch: List[InfrastructureWatchItem] = Field(default_factory=list)
    compute_matrix: List[ComputeMatrixItem] = Field(default_factory=list)
    grants_talent: List[GrantsTalentItem] = Field(default_factory=list)
    talking_points: List[TalkingPointItem] = Field(default_factory=list)
    security_advisories: List[SecurityAdvisoryItem] = Field(default_factory=list)
    arxiv_research: List[ArxivPaperItem] = Field(default_factory=list)

    @field_validator("dispatch_id")
    @classmethod
    def validate_dispatch_id(cls, v: str) -> str:
        if not v or not v.startswith("SKY-TIB"):
            raise ValueError("dispatch_id must start with 'SKY-TIB'")
        return v
