# BiteSpeed

The project aims to provide a solution to the following problem statement at : [https://bitespeed.notion.site/Bitespeed-Backend-Task-Identity-Reconciliation-53392ab01fe149fab989422300423199](https://bitespeed.notion.site/Bitespeed-Backend-Task-Identity-Reconciliation-53392ab01fe149fab989422300423199)

# Tech Stack

**Node.js**
**Postgres**
**Express.js**

# How to Run

1. install all the dependencies as mentioned in **package.json**
2. Put a valid DB URL in the **.env** file
3. Use **npm start** to run the app locally

# Thought Process

In the assignment we have users who order machine parts online and they provide **email** or **phoneNumber** or both which serve as credentials

Depending on the recieved credentials we need to check if some previous order has been made using the same credentials either **email** or **phoneNumber** and perform the tasks as mentioned in the assignment

# Race Conditions

This problem statement needs to handle highly concurrent case when multiple orders are made at the same time using some common credential i.e two users making the order at the same time using the same **email** or **phoneNumer**.

So I have put a transaction block to make the entire set of queries as **Atomic** and which will prevent **race conditions** and keep the DB in consistent state

# Inconsisent States

Due to race condition, our DB may attain an inconsistent state where multiple records with same **email** or **phoneNumber** may be labelled as **primary** at the same time which may arise due to **DIRTY READ PROBLEM**

and there can be some other cases of **DIRTY WRITE** problem where our problem updates DB based on some old invalid state of DB.

# Sample Request

```
URL : http://localhost:8080/api/v1/identity
Payload :
{
    "email" : "example1@example.com",
    "phoneNumber" : "9872",
}

```
