-- Demo Products for Africma's & Dakeb Farm LTD
-- This script updates existing products with enhanced details
-- Run this in Supabase SQL Editor

DO $$
DECLARE
  v_shea_butter_id uuid;
  v_shea_oil_id uuid;
  v_soybean_id uuid;
  v_baobab_oil_id uuid;
  v_cashew_id uuid;
  v_ginger_id uuid;
BEGIN

  -- 1. Unrefined Grade A Shea Butter (UPSERT)
  INSERT INTO products (name, slug, short_desc, long_desc, is_featured, is_active)
  VALUES (
    'Unrefined Grade A Shea Butter',
    'unrefined-shea-butter-grade-a',
    'Premium raw, unrefined Shea Butter extracted from top-quality nuts. High moisturizing properties, ideal for cosmetics and food industries.',
    'Our Grade A Unrefined Shea Butter is traditionally processed to retain all natural vitamins (A, E, F) and healing properties. Sourced directly from women cooperatives across Africa, ensuring fair trade and consistent quality. It has a rich nutty aroma and a creamy texture, perfect for skincare formulations, hair products, and confectionery usage. Free from chemicals, additives, and preservatives.',
    true,
    true
  )
  ON CONFLICT (slug) 
  DO UPDATE SET
    name = EXCLUDED.name,
    short_desc = EXCLUDED.short_desc,
    long_desc = EXCLUDED.long_desc,
    is_featured = EXCLUDED.is_featured,
    is_active = EXCLUDED.is_active,
    updated_at = now()
  RETURNING id INTO v_shea_butter_id;

  -- Delete existing specs and insert new ones
  DELETE FROM product_specs WHERE product_id = v_shea_butter_id;
  INSERT INTO product_specs (product_id, grade_type, moisture, purity, origin, packaging_options, moq, shelf_life, lead_time, documentation, applications)
  VALUES (
    v_shea_butter_id,
    'Grade A (Unrefined/Raw)',
    '< 1%',
    '100% Pure, Free from impurities',
    'Africa',
    ARRAY['25kg Cartons', '50kg Drums', 'Bulk Container Options'],
    '100 kg',
    '24 Months (stored properly)',
    '1-2 Weeks',
    ARRAY['Certificate of Analysis (COA)', 'MSDS', 'Phytosanitary Certificate', 'Certificate of Origin', 'Halal/Kosher (upon request)'],
    ARRAY['Cosmetics & Skincare', 'Haircare Products', 'Soaps & Balms', 'Food/Confectionery', 'Pharmaceutical Excipient']
  );

  -- 2. Premium Shea Oil
  INSERT INTO products (name, slug, short_desc, long_desc, is_featured, is_active)
  VALUES (
    'Premium Shea Oil',
    'premium-shea-oil',
    'Fractionated Shea Oil offering high stability and absorption. Perfect for lotions, creams, and massage oils requiring a lighter texture.',
    'Shea Oil is the liquid fraction of Shea Butter, offering intense hydration without the solid waxy feel. It stays liquid at room temperature and is highly rich in oleic and stearic acids. Ideal for premium cosmetic formulations that require quick absorption and a smooth finish. Our cold-pressed method ensures maximum retention of beneficial properties while providing extended shelf life and stability in various climates.',
    true,
    true
  )
  ON CONFLICT (slug) 
  DO UPDATE SET
    name = EXCLUDED.name,
    short_desc = EXCLUDED.short_desc,
    long_desc = EXCLUDED.long_desc,
    is_featured = EXCLUDED.is_featured,
    is_active = EXCLUDED.is_active,
    updated_at = now()
  RETURNING id INTO v_shea_oil_id;

  DELETE FROM product_specs WHERE product_id = v_shea_oil_id;
  INSERT INTO product_specs (product_id, grade_type, moisture, purity, origin, packaging_options, moq, shelf_life, lead_time, documentation, applications)
  VALUES (
    v_shea_oil_id,
    'Refined / Fractionated',
    '< 0.5%',
    '100% Pure',
    'Africa',
    ARRAY['20L Jerrycans', '200L Drums', 'IBC Totes (1000L)'],
    '200 Liters',
    '18 Months',
    '2 Weeks',
    ARRAY['COA', 'MSDS', 'Certificate of Origin', 'Allergen Statement'],
    ARRAY['Massage Oils', 'Body Lotions', 'Hair Serums', 'Aromatherapy Base', 'Lip Care Products']
  );

  -- 3. Premium Grade Soybean
  INSERT INTO products (name, slug, short_desc, long_desc, is_featured, is_active)
  VALUES (
    'Premium Grade Soybean',
    'premium-grade-soybean',
    'High-protein, non-GMO soybeans suitable for food processing and animal feed. Cleaned and dried to export standards.',
    'We supply premium quality soybeans cultivated in the fertile agricultural belts of Ghana. Our soybeans are carefully harvested at optimal maturity, cleaned, and dried to ensure low moisture content and high protein value. Perfect for soy milk production, tofu manufacturing, oil extraction, and high-quality animal feed. Each batch undergoes rigorous quality control to meet international standards for food safety and nutritional content.',
    true,
    true
  )
  ON CONFLICT (slug) 
  DO UPDATE SET
    name = EXCLUDED.name,
    short_desc = EXCLUDED.short_desc,
    long_desc = EXCLUDED.long_desc,
    is_featured = EXCLUDED.is_featured,
    is_active = EXCLUDED.is_active,
    updated_at = now()
  RETURNING id INTO v_soybean_id;

  DELETE FROM product_specs WHERE product_id = v_soybean_id;
  INSERT INTO product_specs (product_id, grade_type, moisture, purity, origin, packaging_options, moq, shelf_life, lead_time, documentation, applications)
  VALUES (
    v_soybean_id,
    'Grade 1 (Non-GMO)',
    '< 12%',
    '99% Clean (Free from foreign matter)',
    'Africa',
    ARRAY['50kg PP Bags', '100kg Jute Bags', 'Bulk Container Liner'],
    '20 Metric Tons (1 Container FCL)',
    '12 Months',
    '2-3 Weeks',
    ARRAY['Phytosanitary Certificate', 'Fumigation Certificate', 'Certificate of Origin', 'Quality Certificate', 'Non-GMO Declaration'],
    ARRAY['Food Processing (Soy Milk/Tofu)', 'Oil Extraction', 'Animal Feed', 'Protein Concentrate']
  );

  -- 4. Cold-Pressed Baobab Oil
  INSERT INTO products (name, slug, short_desc, long_desc, is_featured, is_active)
  VALUES (
    'Cold-Pressed Baobab Oil',
    'cold-pressed-baobab-oil',
    'Cold-pressed golden oil rich in Omega-3, 6, and 9. A luxury ingredient for anti-aging and skin repair formulations.',
    'Extracted from the seeds of the African Baobab fruit, this cold-pressed oil is a powerhouse of antioxidants and essential fatty acids. It absorbs quickly into the skin, improves elasticity, and promotes cell regeneration. Rich in Vitamins A, D, E, and F, it is a highly sought-after ingredient for high-end beauty and wellness brands. Our ethical sourcing practices support local communities while ensuring product purity and sustainability.',
    true,
    true
  )
  ON CONFLICT (slug) 
  DO UPDATE SET
    name = EXCLUDED.name,
    short_desc = EXCLUDED.short_desc,
    long_desc = EXCLUDED.long_desc,
    is_featured = EXCLUDED.is_featured,
    is_active = EXCLUDED.is_active,
    updated_at = now()
  RETURNING id INTO v_baobab_oil_id;

  DELETE FROM product_specs WHERE product_id = v_baobab_oil_id;
  INSERT INTO product_specs (product_id, grade_type, moisture, purity, origin, packaging_options, moq, shelf_life, lead_time, documentation, applications)
  VALUES (
    v_baobab_oil_id,
    'Cold Pressed / Virgin',
    '< 0.2%',
    '100% Pure',
    'Africa',
    ARRAY['5L Gallons', '25L Drums', '200L Drums'],
    '25 Liters',
    '24 Months',
    '1-2 Weeks',
    ARRAY['COA', 'MSDS', 'Organic Certificate (available)', 'Certificate of Origin'],
    ARRAY['Anti-aging Creams', 'Face Serums', 'Body Oils', 'Hair Conditioning Treatments', 'Nail & Cuticle Care']
  );

  -- 5. Raw Cashew Nuts (RCN) - NEW PRODUCT
  INSERT INTO products (name, slug, short_desc, long_desc, is_featured, is_active)
  VALUES (
    'Raw Cashew Nuts in Shell',
    'raw-cashew-nuts-in-shell',
    'Premium quality Raw Cashew Nuts (RCN) in shell, ideal for processing facilities worldwide. High kernel outturn.',
    'Our Raw Cashew Nuts are carefully sourced from smallholder farmers across Ghana. Each nut is sun-dried to optimal moisture levels and sorted to remove defects. With a high kernel outturn rate (KOR) of 48-52 lbs per 80kg bag, our RCN is perfect for processors looking for consistent quality and competitive pricing. We work directly with farming cooperatives to ensure traceability and fair trade practices throughout the supply chain.',
    false,
    true
  )
  ON CONFLICT (slug) 
  DO UPDATE SET
    name = EXCLUDED.name,
    short_desc = EXCLUDED.short_desc,
    long_desc = EXCLUDED.long_desc,
    is_featured = EXCLUDED.is_featured,
    is_active = EXCLUDED.is_active,
    updated_at = now()
  RETURNING id INTO v_cashew_id;

  DELETE FROM product_specs WHERE product_id = v_cashew_id;
  INSERT INTO product_specs (product_id, grade_type, moisture, purity, origin, packaging_options, moq, shelf_life, lead_time, documentation, applications)
  VALUES (
    v_cashew_id,
    'RCN Grade: 48-52 KOR',
    '< 10%',
    'Cleaned, sun-dried',
    'Ghana (Brong-Ahafo & Northern Regions)',
    ARRAY['80kg PP Bags', 'Bulk Container (20-22 MT per 40ft)'],
    '20 Metric Tons',
    '12 Months',
    '3-4 Weeks (Seasonal availability)',
    ARRAY['Certificate of Origin', 'Phytosanitary Certificate', 'Fumigation Certificate', 'Quality Certificate', 'Weight Certificate'],
    ARRAY['Cashew Processing Plants', 'Kernel Extraction', 'Cashew Nut Shell Liquid (CNSL) Production']
  );

  -- 6. Dried Ginger Root - NEW PRODUCT
  INSERT INTO products (name, slug, short_desc, long_desc, is_featured, is_active)
  VALUES (
    'Premium Dried Ginger Root',
    'premium-dried-ginger-root',
    'High-quality dried ginger root with strong aroma and pungency. Perfect for spice trade, food manufacturing, and health supplements.',
    'Our premium dried ginger is sourced from the best farms in Ghana, known for producing ginger with high essential oil content and pungency. Each batch is carefully cleaned, sliced or kept whole, and dried using controlled methods to preserve flavor and medicinal properties. Ideal for grinding into powder, use in herbal teas, food processing, and pharmaceutical applications. We offer both organic and conventional options with full traceability.',
    false,
    true
  )
  ON CONFLICT (slug) 
  DO UPDATE SET
    name = EXCLUDED.name,
    short_desc = EXCLUDED.short_desc,
    long_desc = EXCLUDED.long_desc,
    is_featured = EXCLUDED.is_featured,
    is_active = EXCLUDED.is_active,
    updated_at = now()
  RETURNING id INTO v_ginger_id;

  DELETE FROM product_specs WHERE product_id = v_ginger_id;
  INSERT INTO product_specs (product_id, grade_type, moisture, purity, origin, packaging_options, moq, shelf_life, lead_time, documentation, applications)
  VALUES (
    v_ginger_id,
    'Premium Grade (Split/Whole)',
    '< 10%',
    'Clean, Free from mold and aflatoxin',
    'Africa',
    ARRAY['25kg PP Bags', '50kg Jute Bags', 'Bulk Options'],
    '500 kg',
    '18 Months',
    '2 Weeks',
    ARRAY['Phytosanitary Certificate', 'Certificate of Origin', 'Fumigation Certificate', 'COA', 'Organic Certificate (if applicable)'],
    ARRAY['Spice Manufacturing', 'Food & Beverage Industry', 'Herbal Tea Blends', 'Health Supplements', 'Pharmaceutical Ingredients']
  );

END $$;

-- Success message
SELECT 
  'Successfully updated/inserted 6 products!' as status,
  (SELECT COUNT(*) FROM products) as total_products,
  (SELECT COUNT(*) FROM products WHERE is_featured = true) as featured_products;
