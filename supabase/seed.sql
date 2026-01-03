-- Seed Data

-- 1. Site Settings
insert into site_settings (business_name, phone, whatsapp, email, address, socials, seo_defaults)
values (
  'Africma's & Dakeb Farm LTD',
  '+233248209525',
  '233248209525',
  'export@africmadakeb.com',
  'P.O Box Legon Accra Headquarters | Branch: Tamale - Fou',
  '{"linkedin": "https://linkedin.com", "facebook": "https://facebook.com", "instagram": "https://instagram.com"}'::jsonb,
  '{"site_title": "Africma's & Dakeb Farm LTD | Premium Agricultural Exporter Africa", "site_description": "Exporting Grade A Unrefined Shea Butter, Shea Oil, Premium Soybean, and Baobab Oil globally. Reliable supply from across Africa."}'::jsonb
);

-- 2. Products & Specs
do $$
declare
  v_shea_butter_id uuid;
  v_shea_oil_id uuid;
  v_soybean_id uuid;
  v_baobab_id uuid;
begin

  -- Shea Butter
  insert into products (name, slug, short_desc, long_desc, is_featured, is_active)
  values (
    'Unrefined (Grade A) Shea Butter',
    'unrefined-shea-butter-grade-a',
    'Premium raw, unrefined Shea Butter extracted from top-quality nuts. High moisturizing properties, ideal for cosmetics and food industries.',
    'Our Grade A Unrefined Shea Butter is traditionally processed to retain all natural vitamins (A, E, F) and healing properties. Sourced directly from women cooperatives across Africa, ensuring fair trade and consistent quality. It has a rich nutty aroma and a creamy texture, perfect for skincare formulations, hair products, and confectionery usage.',
    true,
    true
  ) returning id into v_shea_butter_id;

  insert into product_specs (product_id, grade_type, moisture, purity, origin, packaging_options, moq, shelf_life, lead_time, documentation, applications)
  values (
    v_shea_butter_id,
    'Grade A (Unrefined/Raw)',
    '< 1%',
    '100% Pure, Free from impurities',
    'Africa',
    ARRAY['25kg Cartons', '50kg Drums', 'Bulk options available'],
    '100 kg',
    '24 Months',
    '1-2 Weeks (depending on volume)',
    ARRAY['COA', 'MSDS', 'Phytosanitary Certificate', 'Certificate of Origin'],
    ARRAY['Cosmetics & Skincare', 'Haircare Products', 'Soaps', 'Food/Confectionery']
  );

  -- Shea Oil
  insert into products (name, slug, short_desc, long_desc, is_featured, is_active)
  values (
    'Shea Oil',
    'shea-oil',
    'Fractionated Shea Oil offering high stability and absorption. Perfect for lotions, creams, and massage oils requiring a lighter texture.',
    'Shea Oil is the liquid fraction of Shea Butter, offering intense hydration without the solid waxy feel. It stays liquid at room temperature and is highly rich in oleic and stearic acids. Ideal for premium cosmetic formulations that require quick absorption and a smooth finish.',
    true,
    true
  ) returning id into v_shea_oil_id;

  insert into product_specs (product_id, grade_type, moisture, purity, origin, packaging_options, moq, shelf_life, lead_time, documentation, applications)
  values (
    v_shea_oil_id,
    'Refined / Fractionated',
    '< 0.5%',
    '100% Pure',
    'Africa',
    ARRAY['20L Jerrycans', '200L Drums', 'IBC Totes'],
    '200 Liters',
    '18 Months',
    '2 Weeks',
    ARRAY['COA', 'MSDS', 'Certificate of Origin'],
    ARRAY['Massage Oils', 'Lotions', 'Hair Serums', 'Aromatherapy']
  );

  -- Premium Grade Soybean
  insert into products (name, slug, short_desc, long_desc, is_featured, is_active)
  values (
    'Premium Grade Soybean',
    'premium-grade-soybean',
    'High-protein, non-GMO soybeans suitable for food processing and animal feed. Cleaned and dried to export standards.',
    'We supply premium quality soybeans cultivated in the fertile belts of Ghana. Our soybeans are carefully harvested, cleaned, and dried to ensure low moisture content and high protein value. Suitable for soy milk production, tofu, oil extraction, and high-quality animal feed.',
    false,
    true
  ) returning id into v_soybean_id;

  insert into product_specs (product_id, grade_type, moisture, purity, origin, packaging_options, moq, shelf_life, lead_time, documentation, applications)
  values (
    v_soybean_id,
    'Grade 1 (Non-GMO)',
    '< 12%',
    '99% Clean',
    'Africa',
    ARRAY['50kg PP Bags', '100kg Jute Bags', 'Bulk Container Liner'],
    '20 Metric Tons (1 Container)',
    '12 Months',
    '2-3 Weeks',
    ARRAY['Phytosanitary Certificate', 'Fumigation Certificate', 'Certificate of Origin', 'Quality Certificate'],
    ARRAY['Food Processing (Soy Milk/Tofu)', 'Oil Extraction', 'Animal Feed']
  );

  -- Baobab Oil
  insert into products (name, slug, short_desc, long_desc, is_featured, is_active)
  values (
    'Baobab Oil',
    'baobab-oil',
    'Cold-pressed golden oil rich in Omega-3, 6, and 9. A luxury ingredient for anti-aging and skin repair formulations.',
    'Extracted from the seeds of the Baobab fruit, this cold-pressed oil is a powerhouse of antioxidants and essential fatty acids. It absorbs quickly, improves skin elasticity, and promotes cell regeneration. A highly sought-after ingredient for high-end beauty and wellness brands.',
    true,
    true
  ) returning id into v_baobab_id;

  insert into product_specs (product_id, grade_type, moisture, purity, origin, packaging_options, moq, shelf_life, lead_time, documentation, applications)
  values (
    v_baobab_id,
    'Cold Pressed / Virgin',
    '< 0.2%',
    '100% Pure',
    'Africa',
    ARRAY['5L Gallons', '25L Drums', '200L Drums'],
    '25 Liters',
    '24 Months',
    '1-2 Weeks',
    ARRAY['COA', 'MSDS', 'Organic Certificate (if applicable)'],
    ARRAY['Anti-aging Creams', 'Body Oils', 'Hair Conditioning', 'Nail Care']
  );

end $$;

-- 3. Page Sections
-- Home Hero
insert into page_sections (page_key, title, content)
values (
  'home',
  'hero',
  '{
    "heading": "Grade A Unrefined Shea Butter, Shea Oil, Premium Soybean & Baobab Oil — Export-Ready Supply From Africa",
    "subheading": "Your trusted partner for high-quality agricultural ingredients. We ensure consistent supply, rigorous quality control, and seamless global logistics.",
    "cta_primary": "Request a Quote",
    "cta_secondary": "Download Specs"
  }'::jsonb
);

-- About Content
insert into page_sections (page_key, title, content)
values (
  'about',
  'company_profile',
  '{
    "mission": "To bridge the gap between African local farmers and the global market by providing premium quality agricultural products while ensuring fair trade and sustainable practices.",
    "vision": "To be the leading exporter of indigenous African agricultural products, recognized for quality, reliability, and integrity.",
    "story": "Founded in Accra, Ghana, Africma's & Dakeb Farm LTD started with a vision to share the richness of Africa's soil with the world. We work directly with farming communities across the continent to source the finest Shea nuts, Soybeans, and Baobab seeds. Our processing facilities adhere to strict hygiene and quality standards to ensure that every shipment meets international export requirements."
  }'::jsonb
);

-- Export Readiness
insert into page_sections (page_key, title, content)
values (
  'export_readiness',
  'capabilities',
  '{
    "shipping_methods": ["Sea Freight (20ft/40ft Containers)", "Air Freight (Urgent/Sample Shipments)", "LCL (Less than Container Load)"],
    "incoterms": ["FOB (Free On Board)", "CIF (Cost, Insurance & Freight)", "EXW (Ex Works)"],
    "ports": ["Tema Port", "Kotoka International Airport"],
    "quality_assurance": "We conduct pre-shipment inspections and provide all necessary certifications including Phytosanitary, Certificate of Origin, and COA to ensure smooth customs clearance at your destination."
  }'::jsonb
);

-- Industries
insert into page_sections (page_key, title, content)
values (
  'industries',
  'overview',
  '{
    "intro": "We serve a diverse range of industries, providing raw materials that meet specific manufacturing standards.",
    "sectors": [
      {"title": "Cosmetics & Personal Care", "desc": "Premium ingredients for lotions, balms, soaps, and hair products."},
      {"title": "Food & Beverage", "desc": "High-quality fats and oils for confectionery, baking, and cooking."},
      {"title": "Pharmaceuticals", "desc": "Natural excipients and active ingredients for medicinal formulations."},
      {"title": "Animal Feed", "desc": "Nutrient-rich soybean for livestock and poultry feed production."}
    ]
  }'::jsonb
);

-- 4. Blog Posts
insert into blog_posts (title, slug, excerpt, content, tags, is_published, published_at)
values 
(
  'How to Choose a Reliable Unrefined Shea Butter Supplier in Africa',
  'how-to-choose-reliable-shea-butter-supplier',
  'Sourcing Shea Butter from Africa? Here are the key factors to consider to ensure you get Grade A quality and consistent supply.',
  '<h2>Understanding Shea Butter Grades</h2><p>Not all Shea Butter is created equal. Grade A (Unrefined) retains the most nutrients...</p><h2>Verification and Compliance</h2><p>Always ask for a Certificate of Analysis (COA) and verify the origin...</p>',
  ARRAY['Sourcing Guide', 'Shea Butter', 'Quality Control'],
  false,
  null
),
(
  'Shea Oil vs Shea Butter: Applications for Skincare & Haircare Brands',
  'shea-oil-vs-shea-butter-applications',
  'Deciding between Shea Oil and Shea Butter for your product line? We break down the differences and best use cases.',
  '<h2>Texture and Absorption</h2><p>Shea Butter is solid and creamy, great for heavy moisturization. Shea Oil is liquid and absorbs faster...</p><h2>Formulation Tips</h2><p>Use Shea Oil for serums and lotions; use Shea Butter for balms and body butters...</p>',
  ARRAY['Product Formulation', 'Shea Oil', 'Cosmetics'],
  false,
  null
),
(
  'Baobab Oil: Benefits, Sourcing, and Export Considerations',
  'baobab-oil-benefits-sourcing',
  'Why Baobab Oil is becoming the new gold standard in anti-aging skincare and what to look for when importing.',
  '<h2>The Superfood for Skin</h2><p>Rich in Vitamin C and essential fatty acids, Baobab oil is a powerful antioxidant...</p><h2>Sourcing Sustainably</h2><p>Our Baobab oil is ethically sourced, supporting local communities...</p>',
  ARRAY['Baobab Oil', 'Market Trends', 'Sustainability'],
  false,
  null
);





