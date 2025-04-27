-- Table: public.audit_log

-- DROP TABLE IF EXISTS public.audit_log;

CREATE TABLE IF NOT EXISTS public.audit_log
(
    tbl text COLLATE pg_catalog."default" NOT NULL,
    op text COLLATE pg_catalog."default" NOT NULL,
    changed jsonb NOT NULL,
    who text COLLATE pg_catalog."default" DEFAULT CURRENT_USER,
    changed_at timestamp with time zone NOT NULL DEFAULT now()
)

-- Table: public.events

-- DROP TABLE IF EXISTS public.events;

CREATE TABLE IF NOT EXISTS public.events
(
    id integer NOT NULL DEFAULT nextval('events_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default",
    media text[] COLLATE pg_catalog."default",
    tags text[] COLLATE pg_catalog."default",
    category character varying(100) COLLATE pg_catalog."default",
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    location_string text COLLATE pg_catalog."default",
    location_long numeric(9,6),
    location_lat numeric(9,6),
    visibility character varying(10) COLLATE pg_catalog."default",
    max_participants integer,
    current_participants integer DEFAULT 0,
    pricing numeric(10,2),
    creator_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT events_pkey PRIMARY KEY (id),
    CONSTRAINT events_creator_id_fkey FOREIGN KEY (creator_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT chk_dates_valid CHECK (start_date < end_date) NOT VALID,
    CONSTRAINT chk_lat_long CHECK (location_lat >= '-90'::integer::numeric AND location_lat <= 90::numeric AND location_long >= '-180'::integer::numeric AND location_long <= 180::numeric) NOT VALID,
    CONSTRAINT events_visibility_check CHECK (visibility::text = ANY (ARRAY['private'::character varying, 'public'::character varying]::text[]))
)

CREATE OR REPLACE TRIGGER trg_audit_events
    AFTER INSERT OR DELETE OR UPDATE 
    ON public.events
    FOR EACH ROW
    EXECUTE FUNCTION public.log_changes();

-- DROP FUNCTION IF EXISTS public.log_changes();

CREATE OR REPLACE FUNCTION public.log_changes()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
  INSERT INTO public.audit_log(tbl, op, changed, who, changed_at)
    VALUES (
      TG_TABLE_NAME,
      TG_OP,
      CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE to_jsonb(NEW) END,
      current_user,
      now()
    );
  RETURN NULL;  -- fire‐and‐forget
END;
$BODY$;


CREATE OR REPLACE TRIGGER trigger_update_events
    BEFORE UPDATE 
    ON public.events
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp();

-- DROP FUNCTION IF EXISTS public.update_timestamp();

CREATE OR REPLACE FUNCTION public.update_timestamp()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$BODY$;

-- Table: public.payments

-- DROP TABLE IF EXISTS public.payments;

CREATE TABLE IF NOT EXISTS public.payments
(
    id integer NOT NULL DEFAULT nextval('payments_id_seq'::regclass),
    purchase_id integer NOT NULL,
    payment_method character varying(50) COLLATE pg_catalog."default" NOT NULL,
    transaction_id character varying(100) COLLATE pg_catalog."default",
    status character varying(20) COLLATE pg_catalog."default" DEFAULT 'pending'::character varying,
    paid_amount numeric(10,2),
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    user_id integer NOT NULL,
    CONSTRAINT payments_pkey PRIMARY KEY (id),
    CONSTRAINT fk_purchase FOREIGN KEY (purchase_id)
        REFERENCES public.purchases (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

-- Table: public.purchases

-- DROP TABLE IF EXISTS public.purchases;

CREATE TABLE IF NOT EXISTS public.purchases
(
    id integer NOT NULL DEFAULT nextval('purchases_id_seq'::regclass),
    user_id integer NOT NULL,
    ticket_id integer NOT NULL,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    purchase_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT purchases_pkey PRIMARY KEY (id),
    CONSTRAINT fk_ticket FOREIGN KEY (ticket_id)
        REFERENCES public.tickets (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

CREATE OR REPLACE TRIGGER trg_update_purchases
    BEFORE UPDATE 
    ON public.purchases
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp();

CREATE OR REPLACE FUNCTION public.update_timestamp()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$BODY$;


-- Table: public.tickets

-- DROP TABLE IF EXISTS public.tickets;

CREATE TABLE IF NOT EXISTS public.tickets
(
    id integer NOT NULL DEFAULT nextval('tickets_id_seq'::regclass),
    event_id integer NOT NULL,
    is_valid boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT tickets_pkey PRIMARY KEY (id),
    CONSTRAINT fk_event FOREIGN KEY (event_id)
        REFERENCES public.events (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)


-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    user_name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default",
    date_of_birth date,
    sex character varying(10) COLLATE pg_catalog."default",
    passwd_hash text COLLATE pg_catalog."default" NOT NULL,
    is_org boolean NOT NULL DEFAULT false,
    avator text COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)