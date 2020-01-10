# Normalization of Database

source: https://www.studytonight.com/dbms/database-normalization.php

Normalization is a systematic approach of decomposing tables to eliminate data redundancy(repetition) and undesirable characteristics like Insertion, Update and Deletion Anomalies.  

- Insertion Anomaly
- Updation Anomaly
- Deletion Anomaly

### Normalization Rule
Normalization rules are divided into the following normal forms:

1. First Normal Form (all the tables in db should at least be in 1NF)
2. Second Normal Form
3. Third Normal Form
4. Boyce-Codd Normal Form (BCNF)
5. Fourth Normal Form

## 1NF - rules
1. Single Valued Attributes: Each column of your table should be single valued
2. Attribute Domain should not change: In each column the values stored must be of the same kind or type.
3. Unique name for Attributes/Columns: Each column in a table should have a unique name
4. Order doesn't matter: order in which you store the data in your table doesn't matter.

## 2NF

- To be in 2NF: 
  - should be in 1NF
  - should not have any partial dependecies

- Dependency (or functional dependency): i.e. attributes in a table depending on primary key
- Partial dependency: i.e. composite primary key made of combining 2 or more attributes, other attributes in the table depend on part of the primary key

## 3NF

- To be in 3NF: 
  - should be in 2NF
  - should not have transitive dependency

- Transitive dependency: non-prime attribute in the table depends on other non-prime attributes

## BCNF
- To be in BCNF: 
  - should be in 3NF
  - for any dependency A->B (B dependent of A), A should be a **super key**

## 4NF

- To be in 4NF:
  - should be in the Boyce-Codd Normal Form
  - should not have any Multi-valued Dependency

- Multi-valued Dependency: any dependency of A->B is a Multi-valued Dependency if: 
  - for a single value of A, there exists 2 values of B
  - should have >= 3 columns in table for Multi-valued Dependency to exist
  - for this table with A, B, C columns, B and C should be independent of each other


