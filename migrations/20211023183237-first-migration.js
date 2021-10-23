'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.runSql(
    `
    CREATE TABLE book_language
    (
        id character varying(10) NOT NULL,
        description character varying NOT NULL,
        CONSTRAINT book_language_pkey PRIMARY KEY (id)
    );

    CREATE TABLE book_publisher
    (
        id serial NOT NULL,
        name character varying(100) NOT NULL,
        CONSTRAINT book_publisher_pkey PRIMARY KEY (id)
    );

    CREATE TABLE book_author
    (
        id serial NOT NULL,
        citation_name character varying(100) NOT NULL,
        name character varying(300),
        biography character varying NOT NULL,
        CONSTRAINT book_author_pkey PRIMARY KEY (id)
    );

    CREATE TABLE book
    (
        id serial NOT NULL,
        title character varying(300) NOT NULL,
        price bigint NOT NULL,
        available_qty integer NOT NULL,
        release_date date NOT NULL,
        publisher_id bigint NOT NULL,
        CONSTRAINT book_pkey PRIMARY KEY (id),
        CONSTRAINT book_publisher_id_fkey FOREIGN KEY (publisher_id)
            REFERENCES public.book_publisher (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    );

    CREATE TABLE book_language_relationship
    (
        book_id serial NOT NULL,
        language_id character varying(10) NOT NULL,
        CONSTRAINT book_language_relationship_pkey PRIMARY KEY (book_id, language_id),
        CONSTRAINT book_language_relationship_book_id_fkey FOREIGN KEY (book_id)
            REFERENCES public.book (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT book_language_relationship_language_id_fkey FOREIGN KEY (language_id)
            REFERENCES public.book_language (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    );

    CREATE TABLE book_author_relationship
    (
        book_id bigint NOT NULL,
        author_id bigint NOT NULL,
        CONSTRAINT book_author_relationship_pkey PRIMARY KEY (book_id, author_id),
        CONSTRAINT book_author_relationship_author_id_fkey FOREIGN KEY (author_id)
            REFERENCES public.book_author (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE,
        CONSTRAINT book_author_relationship_book_id_fkey FOREIGN KEY (book_id)
            REFERENCES public.book (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE CASCADE
    );
    
   `,
    callback,
  );
};

exports.down = function (db, callback) {
  db.runSql(
    `
    DROP TABLE book_language_relationship;
    DROP TABLE book_author_relationship;
    DROP TABLE book;
    DROP TABLE book_author;
    DROP TABLE book_publisher;
    DROP TABLE book_language;
        `,
    callback,
  );
};

exports._meta = {
  "version": 1
};
