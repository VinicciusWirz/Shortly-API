--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    visits integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.links VALUES (1, 5, 'https://google.com', 'Ko4tJyz4', 0, '2023-05-17 00:00:00');
INSERT INTO public.links VALUES (3, 5, 'https://google.com', 'HDfcbgHm', 0, '2023-05-17 00:00:00');
INSERT INTO public.links VALUES (4, 5, 'https://google.com', 'XH6Rcx3D', 0, '2023-05-17 00:00:00');
INSERT INTO public.links VALUES (5, 5, 'https://google.com', 'IqWsvqxj', 0, '2023-05-17 00:00:00');
INSERT INTO public.links VALUES (2, 5, 'https://google.com', 'Kol2Sqdg', 7, '2023-05-17 00:00:00');
INSERT INTO public.links VALUES (6, 5, 'https://google.com', 'rWeHAxQ1', 1, '2023-05-17 00:00:00');
INSERT INTO public.links VALUES (11, 10, 'https://youtube.com', 'NBxU8Sc8', 0, '2023-05-17 00:00:00');
INSERT INTO public.links VALUES (10, 1, 'https://youtube.com', 'jG8WYPfj', 1, '2023-05-17 00:00:00');
INSERT INTO public.links VALUES (16, 12, 'https://www.youtube.com/watch?v=wz_AiUkdJps', 'GYcDxmac', 2, '2023-05-18 00:00:00');
INSERT INTO public.links VALUES (12, 12, 'https://www.youtube.com/watch?v=16gSeaqC56c', 'oMfTyInr', 7, '2023-05-18 00:00:00');
INSERT INTO public.links VALUES (15, 12, 'https://www.youtube.com/watch?v=k7pr4VTk5cQ', 'h8OJl1U3', 4, '2023-05-18 00:00:00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Usuario 1', 'user@email.com', '$2b$10$Idf7vq0g1SZryxVPzPAkzuB2UKiQBE4A59Yn6/1A9Ej6y771ZADay', '2023-05-17 00:00:00');
INSERT INTO public.users VALUES (5, 'Usuario 2', 'user2@email.com', '$2b$10$vBgc9nCskuOEaEbFJ7O1JuPwYWP6AfvgpRcTcYjX9O/BETKYIvVS.', '2023-05-17 00:00:00');
INSERT INTO public.users VALUES (9, 'Usuario 3', 'user3@email.com', '$2b$10$pIwiTueHlespoIoCHJkzFuov2e9XXxuT.v.ZDtoyMnVlFck1byV/m', '2023-05-17 00:00:00');
INSERT INTO public.users VALUES (10, 'Usuario 4', 'user4@email.com', '$2b$10$mP8HdapGccQ6EIzNWp7Xkenpz9rag.XolU2Hjs3PDk47n1qxOm.1a', '2023-05-17 00:00:00');
INSERT INTO public.users VALUES (12, 'Jorel', 'irmaodoirmaodojorel@email.com', '$2b$10$82R2b.0rK/22/d1EjIY3fOZbwRpE/j9ULymCgIqcnd7ZdISz7CKcG', '2023-05-18 00:00:00');


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 16, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: links links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

