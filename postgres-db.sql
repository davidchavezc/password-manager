CREATE TABLE "users"(
    "id" BIGSERIAL PRIMARY KEY,
    "username" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL
);

CREATE TABLE "credential"(
    "id" BIGSERIAL PRIMARY KEY,
    "owner" BIGINT NOT NULL,
    "username" TEXT NULL,
    "password" TEXT NOT NULL
);
CREATE INDEX "credential_owner_index" ON
    "credential"("owner");
ALTER TABLE
    "credential" ADD CONSTRAINT "credential_owner_fkey" FOREIGN KEY("owner") REFERENCES "users"("id");