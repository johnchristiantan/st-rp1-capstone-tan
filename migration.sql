CREATE TABLE "users" (
  "user_id" integer,
  "user_name"  character varying(255) not null,
  "password"  character varying(255),
  "user_type"  character varying(255),
  CONSTRAINT users_pkey PRIMARY KEY (user_id),
  CONSTRAINT unique_email UNIQUE (user_name)
);
-- SEQUENCE FOR AUTO INCREMENT
CREATE SEQUENCE IF NOT EXISTS public.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1
    OWNED BY users.user_id;

-- 
ALTER TABLE users ALTER COLUMN user_id SET DEFAULT nextval('users_id_seq'::regclass);

CREATE TABLE "branches" (
  "branch_code"  character varying (255) Primary key,
  "branch_name"  character varying (255),
  "percent_share" decimal (2, 0)
  );

CREATE TABLE "discounts" (
  "discount_code"  character varying (255) Primary key,
  "discount_description"  character varying (255),
  "percentage" decimal (2, 0)
);

CREATE TABLE "transactions" (
  "transaction_id" character varying (255),
  "voucher_number" integer,
  "branch_code"  character varying (255),
  "customer_id" integer,
  "date" datetime,
  "total_amount" double (10, 2),
  PRIMARY KEY ("transaction_id")
);

CREATE TABLE "availed_services" (
  "a_service_id" integer     ,
  "therapist_id" integer,
  "service_id" integer,
  "discount_code" character varying (255),
  "tip" Type,
  PRIMARY KEY ("a_service_id")
);
CREATE TABLE "services" (
  "service_id"  integer ,
  "service_name" character varying  (255),
  "service_type" character varying  (255),
  "price" double precision,
  "minutes" integer,
  "commission" double precision,
  PRIMARY KEY ("service_id")
);



