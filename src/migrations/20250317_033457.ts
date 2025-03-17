import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"thumbnail_id" integer NOT NULL,
  	"author_id" integer,
  	"issue_id" integer,
  	"slug" varchar,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "issues" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"issue_number" numeric NOT NULL,
  	"publication_date" timestamp(3) with time zone NOT NULL,
  	"cover_image_id" integer NOT NULL,
  	"description" varchar,
  	"published" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"bio" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "articles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "issues_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "authors_id" integer;
  DO $$ BEGIN
   ALTER TABLE "articles" ADD CONSTRAINT "articles_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles" ADD CONSTRAINT "articles_issue_id_issues_id_fk" FOREIGN KEY ("issue_id") REFERENCES "public"."issues"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "issues" ADD CONSTRAINT "issues_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "authors" ADD CONSTRAINT "authors_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "articles_thumbnail_idx" ON "articles" USING btree ("thumbnail_id");
  CREATE INDEX IF NOT EXISTS "articles_author_idx" ON "articles" USING btree ("author_id");
  CREATE INDEX IF NOT EXISTS "articles_issue_idx" ON "articles" USING btree ("issue_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "articles_rels_categories_id_idx" ON "articles_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "issues_cover_image_idx" ON "issues" USING btree ("cover_image_id");
  CREATE INDEX IF NOT EXISTS "issues_updated_at_idx" ON "issues" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "issues_created_at_idx" ON "issues" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "authors_photo_idx" ON "authors" USING btree ("photo_id");
  CREATE INDEX IF NOT EXISTS "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "authors_created_at_idx" ON "authors" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_issues_fk" FOREIGN KEY ("issues_id") REFERENCES "public"."issues"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_issues_id_idx" ON "payload_locked_documents_rels" USING btree ("issues_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articles_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "issues" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "authors" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "issues" CASCADE;
  DROP TABLE "authors" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_articles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_issues_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_authors_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_articles_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_categories_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_issues_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_authors_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "articles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "issues_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "authors_id";`)
}
