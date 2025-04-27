- Database initiation and Server deployment: 
[README]: /Backend/Database/documents/Backend%20Database%20Server%20deployment%20manual.md
- Schema SetUP:
    - open PGAdmin 4 using PSQL tool
    enter following:
        psql \
            --username YOUR_PG_USER \
            --dbname evmgmt \
            --file backend/db/db_schema.sql
    
    to generate schema
