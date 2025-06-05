DROP TABLE IF EXISTS "credential" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE "user" (
    "id" BIGSERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL UNIQUE,
    "password" TEXT NOT NULL
);

CREATE TABLE "credential" (
    "id" BIGSERIAL PRIMARY KEY,
    "owner" BIGINT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    CONSTRAINT "credential_owner_fkey" FOREIGN KEY ("owner") REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE INDEX "credential_owner_index" ON "credential"("owner");