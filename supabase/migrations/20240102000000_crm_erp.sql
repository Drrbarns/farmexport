-- CRM & ERP Enhancement for Africma's & Dakeb Farm LTD
-- Run this in Supabase SQL Editor after the initial migration

-- ============================================
-- CRM: LEADS & CUSTOMERS
-- ============================================

-- Leads Table (Potential customers)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text,
  whatsapp text,
  country text NOT NULL,
  industry text,
  source text, -- Website RFQ, Trade Show, Cold Outreach, Referral
  status text DEFAULT 'NEW', -- NEW, CONTACTED, QUALIFIED, CONVERTED, LOST
  interest_products text[], -- Array of product slugs
  estimated_value numeric,
  notes text,
  assigned_to text, -- Admin email
  last_contact_date timestamptz,
  next_follow_up_date timestamptz,
  converted_to_customer_id uuid, -- Reference to customers table
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Customers Table (Converted leads / Active buyers)
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text,
  whatsapp text,
  country text NOT NULL,
  address text,
  industry text,
  payment_terms text, -- NET30, NET60, Prepayment, LC
  credit_limit numeric,
  preferred_incoterm text, -- FOB, CIF, EXW
  tax_id text,
  status text DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, BLACKLISTED
  total_orders numeric DEFAULT 0,
  total_revenue numeric DEFAULT 0,
  notes text,
  assigned_to text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Activities / Follow-ups (for both leads and customers)
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  related_to text NOT NULL, -- 'lead' or 'customer'
  related_id uuid NOT NULL,
  activity_type text NOT NULL, -- CALL, EMAIL, MEETING, QUOTE_SENT, SAMPLE_SENT, FOLLOW_UP
  subject text NOT NULL,
  notes text,
  scheduled_date timestamptz,
  completed boolean DEFAULT false,
  completed_date timestamptz,
  created_by text,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- ERP: ORDERS & INVENTORY
-- ============================================

-- Orders Table (Confirmed sales)
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id),
  rfq_id uuid REFERENCES rfqs(id), -- Link back to original RFQ
  order_date date NOT NULL,
  delivery_date date,
  status text DEFAULT 'PENDING', -- PENDING, CONFIRMED, IN_PRODUCTION, READY, SHIPPED, DELIVERED, CANCELLED
  incoterm text NOT NULL,
  destination_country text NOT NULL,
  destination_port text,
  shipping_method text, -- Sea Freight, Air Freight
  payment_status text DEFAULT 'PENDING', -- PENDING, DEPOSIT_PAID, PAID, OVERDUE
  payment_terms text,
  subtotal numeric NOT NULL,
  shipping_cost numeric DEFAULT 0,
  total_amount numeric NOT NULL,
  currency text DEFAULT 'USD',
  notes text,
  assigned_to text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  product_name text NOT NULL,
  quantity numeric NOT NULL,
  unit text NOT NULL, -- kg, L, MT, bags
  unit_price numeric NOT NULL,
  total_price numeric NOT NULL,
  packaging text,
  special_requirements text,
  created_at timestamptz DEFAULT now()
);

-- Inventory / Stock Management
CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) UNIQUE,
  available_quantity numeric DEFAULT 0,
  unit text NOT NULL, -- kg, L, MT
  reserved_quantity numeric DEFAULT 0, -- Reserved for pending orders
  reorder_level numeric, -- Minimum stock alert
  warehouse_location text,
  last_restocked_date date,
  notes text,
  updated_at timestamptz DEFAULT now()
);

-- Suppliers Table (Farmer cooperatives / Raw material sources)
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  phone text,
  whatsapp text,
  location text NOT NULL, -- Region in Ghana
  products_supplied text[], -- Array of product types
  rating numeric, -- 1-5 star rating
  payment_terms text,
  bank_details text,
  status text DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE
  total_supplied numeric DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Purchase Orders (from suppliers)
CREATE TABLE IF NOT EXISTS purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  po_no text UNIQUE NOT NULL,
  supplier_id uuid REFERENCES suppliers(id),
  product_id uuid REFERENCES products(id),
  quantity numeric NOT NULL,
  unit text NOT NULL,
  unit_price numeric NOT NULL,
  total_amount numeric NOT NULL,
  order_date date NOT NULL,
  expected_delivery_date date,
  status text DEFAULT 'PENDING', -- PENDING, CONFIRMED, RECEIVED, CANCELLED
  payment_status text DEFAULT 'PENDING',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Shipments Table (Export logistics tracking)
CREATE TABLE IF NOT EXISTS shipments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_no text UNIQUE NOT NULL,
  order_id uuid REFERENCES orders(id),
  shipping_line text, -- Maersk, MSC, etc
  container_no text,
  container_type text, -- 20ft, 40ft, 40ft HC
  bill_of_lading_no text,
  departure_port text DEFAULT 'Tema Port, Ghana',
  destination_port text NOT NULL,
  etd date, -- Estimated Time of Departure
  eta date, -- Estimated Time of Arrival
  atd date, -- Actual Time of Departure
  ata date, -- Actual Time of Arrival
  status text DEFAULT 'PREPARING', -- PREPARING, IN_TRANSIT, ARRIVED, CLEARED, DELIVERED
  tracking_url text,
  documents_sent boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_activities_related ON activities(related_to, related_id);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins full access to leads" ON leads FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to customers" ON customers FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to activities" ON activities FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to orders" ON orders FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to order_items" ON order_items FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to inventory" ON inventory FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to suppliers" ON suppliers FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to purchase_orders" ON purchase_orders FOR ALL USING (is_admin());
CREATE POLICY "Admins full access to shipments" ON shipments FOR ALL USING (is_admin());

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT 'CRM & ERP tables created successfully!' as status;

