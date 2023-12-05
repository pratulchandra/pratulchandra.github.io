-- Table: public.reviews

-- DROP TABLE IF EXISTS public.reviews;

CREATE TABLE IF NOT EXISTS public.reviews
(
    id bigint NOT NULL DEFAULT nextval('reviews_id_seq'::regclass),
    brewery_name character varying COLLATE pg_catalog."default" NOT NULL,
    review character varying COLLATE pg_catalog."default",
    review_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.reviews
    OWNER to postgres;