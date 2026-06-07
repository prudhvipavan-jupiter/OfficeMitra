-- OfficeMitra Intelligence Engine
-- Run in Supabase SQL Editor or via supabase db push

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- Monitoring sources registry
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS intel_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  check_method TEXT NOT NULL DEFAULT 'html_links'
    CHECK (check_method IN ('rss', 'html_links', 'page_hash')),
  feed_url TEXT,
  link_selector TEXT,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_checked TIMESTAMPTZ,
  last_update_found TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_intel_sources_active ON intel_sources(active);
CREATE INDEX IF NOT EXISTS idx_intel_sources_category ON intel_sources(category);

-- ---------------------------------------------------------------------------
-- Detected updates (metadata + AI drafts — never auto-published)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS intel_detected_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id UUID NOT NULL REFERENCES intel_sources(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  source_url TEXT NOT NULL,
  published_date DATE,
  fingerprint TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'NEW'
    CHECK (status IN ('NEW', 'DRAFT_GENERATED', 'APPROVED', 'REJECTED', 'PUBLISHED')),
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- AI-generated original explanatory content (not copied from source)
  ai_title TEXT,
  ai_summary TEXT,
  ai_what_changed TEXT,
  ai_who_affected TEXT,
  ai_action_required TEXT,
  ai_reference_source TEXT,
  ai_department_impact TEXT,
  ai_keywords JSONB NOT NULL DEFAULT '[]'::jsonb,
  ai_body TEXT,
  admin_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  reviewed_by TEXT,
  published_at TIMESTAMPTZ,
  published_slug TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_intel_updates_status ON intel_detected_updates(status, detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_intel_updates_source ON intel_detected_updates(source_id);
CREATE INDEX IF NOT EXISTS idx_intel_updates_detected ON intel_detected_updates(detected_at DESC);

-- ---------------------------------------------------------------------------
-- Monitoring run history
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS intel_monitoring_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'running'
    CHECK (status IN ('running', 'completed', 'failed')),
  sources_checked INTEGER NOT NULL DEFAULT 0,
  items_found INTEGER NOT NULL DEFAULT 0,
  drafts_generated INTEGER NOT NULL DEFAULT 0,
  error_message TEXT,
  details JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_intel_runs_started ON intel_monitoring_runs(started_at DESC);

-- ---------------------------------------------------------------------------
-- Activity log (dashboard feed)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS intel_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_intel_activity_created ON intel_activity_log(created_at DESC);

-- ---------------------------------------------------------------------------
-- Updated_at trigger
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION intel_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS intel_sources_updated ON intel_sources;
CREATE TRIGGER intel_sources_updated
  BEFORE UPDATE ON intel_sources
  FOR EACH ROW EXECUTE FUNCTION intel_set_updated_at();

DROP TRIGGER IF EXISTS intel_updates_updated ON intel_detected_updates;
CREATE TRIGGER intel_updates_updated
  BEFORE UPDATE ON intel_detected_updates
  FOR EACH ROW EXECUTE FUNCTION intel_set_updated_at();

-- ---------------------------------------------------------------------------
-- Seed monitoring sources (configurable via Admin Panel later)
-- ---------------------------------------------------------------------------
INSERT INTO intel_sources (name, url, category, check_method, feed_url, link_selector, config)
VALUES
  (
    'GOIR — Government Orders Repository',
    'https://goir.ap.gov.in/',
    'Andhra Pradesh Government',
    'html_links',
    NULL,
    'a[href]',
    '{"link_pattern": "goir|order|g.o|go-", "max_items": 25}'::jsonb
  ),
  (
    'AP Health Department',
    'https://health.ap.gov.in/',
    'Health Department',
    'html_links',
    NULL,
    'a[href]',
    '{"link_pattern": "circular|notification|order|proceedings", "max_items": 20}'::jsonb
  ),
  (
    'AP Finance Department',
    'https://finance.ap.gov.in/',
    'Finance Department',
    'html_links',
    NULL,
    'a[href]',
    '{"link_pattern": "circular|notification|order|budget|treasury", "max_items": 20}'::jsonb
  ),
  (
    'APPSC — Recruitment',
    'https://psc.ap.gov.in/',
    'APPSC',
    'html_links',
    NULL,
    'a[href]',
    '{"link_pattern": "notification|recruit|exam|syllabus", "max_items": 20}'::jsonb
  ),
  (
    'APMSIDC',
    'https://apmsidc.ap.gov.in/',
    'APMSIDC',
    'page_hash',
    NULL,
    NULL,
    '{}'::jsonb
  ),
  (
    'AP Treasury',
    'https://treasury.ap.gov.in/',
    'Treasury',
    'html_links',
    NULL,
    'a[href]',
    '{"link_pattern": "circular|notification|order|cfms", "max_items": 20}'::jsonb
  ),
  (
    'General Administration Department',
    'https://gad.ap.gov.in/',
    'General Administration Department',
    'html_links',
    NULL,
    'a[href]',
    '{"link_pattern": "circular|notification|order|service", "max_items": 20}'::jsonb
  )
ON CONFLICT DO NOTHING;
