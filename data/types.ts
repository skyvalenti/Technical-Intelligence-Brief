/**
 * SKY Technical Intelligence Brief Type Definitions
 * Domain: 3D Platforms, Computer Graphics Pipelines, Scientific Computing, and Academic Research.
 */

export interface MetricDetail {
  level: string;
  driver: string;
  value: number;
}

export interface Metrics {
  sev_1: MetricDetail;
  opp_1: MetricDetail;
  sev_2: MetricDetail;
  opp_2: MetricDetail;
}

export interface LinkItem {
  title: string;
  url: string;
}

export interface CompoundImpactItem {
  vector: string;
  synthesis: string;
  links: LinkItem[];
}

export interface ExecutiveBriefItem {
  tag: string;
  title: string;
  severity: string;
  detail: string;
  link: {
    label: string;
    url: string;
  };
}

export interface ImpactMatrixItem {
  sector: string;
  vector: string;
  rating: string;
  consequence: string;
  source_url: string;
}

export interface ResearchTelemetryItem {
  domain: string;
  title: string;
  severity: string;
  specs: {
    vram: string;
    license: string;
    interop: string;
  };
  lineage: string[];
  url: string;
}

export interface InfrastructureWatchItem {
  domain: string;
  entity: string;
  rating: string;
  specs: {
    license: string;
    interop: string;
  };
  governance: string;
  url: string;
}

export interface ComputeMatrixItem {
  platform: string;
  allocation: string;
  tte: string;
  threshold: string;
  url: string;
}

export interface GrantsTalentItem {
  title: string;
  rating: string;
  detail: string;
  url: string;
}

export interface TalkingPointItem {
  audience: string;
  script: string;
}

export interface SkyTechnicalIntelligenceReport {
  dispatch_id: string;
  cadence: string;
  status: string;
  sector: string;
  metrics: Metrics;
  compound_impact_analysis: CompoundImpactItem[];
  executive_brief: ExecutiveBriefItem[];
  impact_matrix: ImpactMatrixItem[];
  research_telemetry: ResearchTelemetryItem[];
  infrastructure_watch: InfrastructureWatchItem[];
  compute_matrix: ComputeMatrixItem[];
  grants_talent: GrantsTalentItem[];
  talking_points: TalkingPointItem[];
}

export default SkyTechnicalIntelligenceReport;
