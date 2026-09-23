CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "public"."SaleDocument" (
    "Id" varchar NOT NULL,
    "DocumentNumber" varchar,
    "DocumentDate" timestamp,
    "CustomerId" varchar,
    "TotalWeight" decimal,
    "TotalVolume" decimal,
    "TotalNetWeight" decimal,
    "DeliveryDate" timestamp,
    "DeliveryState" bigint,
    "DeliveryAddress_Longitude" decimal,
    "DeliveryAddress_Latitude" decimal,
    CONSTRAINT "pk_table_26_id" PRIMARY KEY ("Id")
);

CREATE TABLE "public"."SaleDocumentLine" (
    "Id" varchar NOT NULL,
    "DocumentId" varchar,
    "ItemId" varchar,
    "sysCreatedDate" timestamp,
    "sysCreatedUser" timestamp,
    "sysModifiedDate" timestamp,
    "LineType" int,
    "RealQuantity" decimal,
    CONSTRAINT "pk_table_27_id" PRIMARY KEY ("Id")
);

CREATE TABLE "public"."premission" (
    "id" int NOT NULL,
    "action" varchar,
    "is_deleted" boolean,
    "deleted_at" date,
    CONSTRAINT "pk_table_2_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."info_client" (
    "id" int NOT NULL,
    "customer_id" varchar,
    "user_id" int,
    "name" varchar,
    "company" varchar,
    "country" varchar,
    "city" varchar,
    "post_code" varchar,
    "address" varchar,
    "phone" varchar,
    "email" varchar,
    CONSTRAINT "pk_table_7_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."type_vehicule" (
    "id" int NOT NULL,
    "name" varchar,
    CONSTRAINT "pk_table_24_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."produit_commande" (
    "id" int NOT NULL,
    "commande_id" int,
    "produit_id" int,
    CONSTRAINT "pk_table_23_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."commande" (
    "id" int NOT NULL,
    "client_id" int,
    "statut_id" int,
    "adresse" varchar,
    "contact" varchar,
    "date_livraison" date,
    "quantite" int,
    "volume" decimal,
    "poids" decimal,
    "modalite_payement" int,
    "mode_payement" int,
    CONSTRAINT "pk_table_6_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."intervention" (
    "id" int NOT NULL,
    "incident_id" int,
    "description" varchar,
    "user_id" int,
    "cout" numeric,
    "date" date,
    CONSTRAINT "pk_table_15_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."incident" (
    "id" int NOT NULL,
    "type" int,
    "cause" text,
    "vehicule_id" int,
    "user_id" int,
    "date" date,
    CONSTRAINT "pk_table_14_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."command_status" (
    "id" int NOT NULL,
    "name" varchar,
    CONSTRAINT "pk_table_8_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."livraison" (
    "id" int NOT NULL,
    "commande_id" int,
    "chauffeur_id" int,
    "vehicule_id" int,
    "date_depart" date,
    "date_prevue_arrivee" date,
    "statut" int,
    "maximum_mileage" decimal,
    "mileage" decimal,
    CONSTRAINT "pk_table_19_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Template" (
    "id" int NOT NULL,
    "type" varchar,
    "subject" varchar,
    "template" text,
    CONSTRAINT "pk_table_25_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."livraison_status" (
    "id" int NOT NULL,
    "name" varchar,
    CONSTRAINT "pk_table_21_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."employee" (
    "id" int NOT NULL,
    "matricule" int,
    CONSTRAINT "pk_table_22_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."vehicle_status" (
    "id" int NOT NULL,
    "name" varchar,
    CONSTRAINT "pk_table_11_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."log" (
    "id" int NOT NULL,
    "date" timestamp,
    "user_id" int,
    CONSTRAINT "pk_table_20_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."base" (
    "id" int NOT NULL,
    "created_at" date,
    "deleted_at" date,
    "is_deleted" boolean,
    "updated_at" date,
    CONSTRAINT "pk_table_27_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."document_intervention" (
    "id" int NOT NULL,
    "intervention_id" int,
    "document" bytea,
    CONSTRAINT "pk_table_17_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."log_gps" (
    "id" int NOT NULL,
    "date" date,
    "vehicule_id" int,
    "chaffeur_id" int,
    "isActive" boolean,
    "kilometrage" decimal,
    "temps_moteur" int,
    "carburant" decimal,
    "longitute" decimal,
    "latitude" decimal,
    "vitesse" varchar,
    CONSTRAINT "pk_table_18_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Item" (
    "Id" varchar NOT NULL,
    "Height" bigint,
    "Width" bigint,
    "Length" bigint,
    "Volume" bigint,
    "VolumeUnitId" bigint,
    "Weight" bigint,
    "NetWeight" bigint,
    CONSTRAINT "pk_table_28_id" PRIMARY KEY ("Id")
);

CREATE TABLE "public"."vehicule" (
    "id" int NOT NULL,
    "client_id" int,
    "immatriculation" varchar,
    "type" int,
    "marque" varchar,
    "charge supportée" varchar,
    "consommation" varchar,
    "statut" int,
    "odo" bigint,
    "name" varchar,
    "imei" varchar,
    "port" varchar,
    "ip" varchar,
    "active" boolean,
    "expire" boolean,
    "expire_dt" timestamp,
    "device" varchar,
    "sim_number" varchar,
    "model" varchar,
    "vin" varchar,
    "plate_number" varchar,
    CONSTRAINT "pk_table_10_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."role_permission" (
    "id" int NOT NULL,
    "role" int,
    "permission" int,
    CONSTRAINT "pk_table_3_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."type_incident" (
    "id" int NOT NULL,
    "name" varchar,
    CONSTRAINT "pk_table_12_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."info_chauffeur" (
    "id" int NOT NULL,
    "user_id" int,
    "matricule" int,
    "premis" bytea,
    "validite_permis" date,
    CONSTRAINT "pk_table_5_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."reset_tokens" (
    "id" int NOT NULL,
    "user_id" int,
    "created_at" timestamp,
    "hash_token" varchar,
    "used_at" timestamp,
    "expired_at" bigint,
    "context" varchar,
    "item" varchar,
    CONSTRAINT "pk_table_26_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."produit" (
    "id" int NOT NULL,
    "name" varchar,
    "prix" decimal,
    CONSTRAINT "pk_table_9_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."role" (
    "id" int NOT NULL,
    "name" varchar,
    CONSTRAINT "pk_table_1_id" PRIMARY KEY ("id")
);

CREATE TABLE "public"."user" (
    "id" int NOT NULL,
    "first_name" varchar,
    "last_name" varchar,
    "email" varchar,
    "avatar_url" varchar,
    "is_active" boolean,
    "password" varchar,
    "role_id" int,
    "password_changed_at" timestamp,
    CONSTRAINT "pk_table_4_id" PRIMARY KEY ("id")
);

-- Foreign key constraints
-- Schema: public
ALTER TABLE "public"."info_client" ADD CONSTRAINT "fk_info_client_id_commande_client_id" FOREIGN KEY("id") REFERENCES "public"."commande"("client_id");
ALTER TABLE "public"."command_status" ADD CONSTRAINT "fk_command_status_id_commande_statut_id" FOREIGN KEY("id") REFERENCES "public"."commande"("statut_id");
ALTER TABLE "public"."commande" ADD CONSTRAINT "fk_commande_id_livraison_commande_id" FOREIGN KEY("id") REFERENCES "public"."livraison"("commande_id");
ALTER TABLE "public"."commande" ADD CONSTRAINT "fk_commande_id_produit_commande_commande_id" FOREIGN KEY("id") REFERENCES "public"."produit_commande"("commande_id");
ALTER TABLE "public"."incident" ADD CONSTRAINT "fk_incident_id_intervention_incident_id" FOREIGN KEY("id") REFERENCES "public"."intervention"("incident_id");
ALTER TABLE "public"."info_client" ADD CONSTRAINT "fk_info_client_id_vehicule_client_id" FOREIGN KEY("id") REFERENCES "public"."vehicule"("client_id");
ALTER TABLE "public"."intervention" ADD CONSTRAINT "fk_intervention_id_document_intervention_id" FOREIGN KEY("id") REFERENCES "public"."document_intervention"("id");
ALTER TABLE "public"."Item" ADD CONSTRAINT "fk_Item_Id_SaleDocumentLine_ItemId" FOREIGN KEY("Id") REFERENCES "public"."SaleDocumentLine"("ItemId");
ALTER TABLE "public"."livraison_status" ADD CONSTRAINT "fk_livraison_status_id_livraison_statut" FOREIGN KEY("id") REFERENCES "public"."livraison"("statut");
ALTER TABLE "public"."premission" ADD CONSTRAINT "fk_premission_id_role_permission_permission" FOREIGN KEY("id") REFERENCES "public"."role_permission"("permission");
ALTER TABLE "public"."produit" ADD CONSTRAINT "fk_produit_id_produit_commande_produit_id" FOREIGN KEY("id") REFERENCES "public"."produit_commande"("produit_id");
ALTER TABLE "public"."role" ADD CONSTRAINT "fk_role_id_user_role_id" FOREIGN KEY("id") REFERENCES "public"."user"("role_id");
ALTER TABLE "public"."role" ADD CONSTRAINT "fk_role_id_role_permission_role" FOREIGN KEY("id") REFERENCES "public"."role_permission"("role");
ALTER TABLE "public"."SaleDocument" ADD CONSTRAINT "fk_SaleDocument_Id_SaleDocumentLine_DocumentId" FOREIGN KEY("Id") REFERENCES "public"."SaleDocumentLine"("DocumentId");
ALTER TABLE "public"."type_incident" ADD CONSTRAINT "fk_type_incident_id_incident_type" FOREIGN KEY("id") REFERENCES "public"."incident"("type");
ALTER TABLE "public"."type_vehicule" ADD CONSTRAINT "fk_type_vehicule_id_vehicule_type" FOREIGN KEY("id") REFERENCES "public"."vehicule"("type");
ALTER TABLE "public"."user" ADD CONSTRAINT "fk_user_id_info_client_user_id" FOREIGN KEY("id") REFERENCES "public"."info_client"("user_id");
ALTER TABLE "public"."user" ADD CONSTRAINT "fk_user_id_log_user_id" FOREIGN KEY("id") REFERENCES "public"."log"("user_id");
ALTER TABLE "public"."user" ADD CONSTRAINT "fk_user_id_livraison_chauffeur_id" FOREIGN KEY("id") REFERENCES "public"."livraison"("chauffeur_id");
ALTER TABLE "public"."user" ADD CONSTRAINT "fk_user_id_reset_tokens_user_id" FOREIGN KEY("id") REFERENCES "public"."reset_tokens"("user_id");
ALTER TABLE "public"."user" ADD CONSTRAINT "fk_user_id_info_chauffeur_id" FOREIGN KEY("id") REFERENCES "public"."info_chauffeur"("id");
ALTER TABLE "public"."vehicle_status" ADD CONSTRAINT "fk_vehicle_status_id_vehicule_statut" FOREIGN KEY("id") REFERENCES "public"."vehicule"("statut");
ALTER TABLE "public"."vehicule" ADD CONSTRAINT "fk_vehicule_id_livraison_vehicule_id" FOREIGN KEY("id") REFERENCES "public"."livraison"("vehicule_id");
ALTER TABLE "public"."vehicule" ADD CONSTRAINT "fk_vehicule_id_incident_vehicule_id" FOREIGN KEY("id") REFERENCES "public"."incident"("vehicule_id");
ALTER TABLE "public"."info_client" ADD CONSTRAINT "fk_info_client_customer_id_SaleDocument_CustomerId" FOREIGN KEY("customer_id") REFERENCES "public"."SaleDocument"("CustomerId");