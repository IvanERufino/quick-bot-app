from typing import List
from google.cloud.bigquery import Client as BigQueryClient, Table, SchemaField

from src.model.intent import Intent

bigquery_client = BigQueryClient()
PROJECT_ID = bigquery_client.project

def create_dataset(dataset_name: str):
    bigquery_client.delete_dataset(dataset_name, delete_contents=True, not_found_ok=True)
    print(f"{dataset_name} Creating dataset...")
    bigquery_client.create_dataset(dataset_name)

def create_table(dataset: str, table_name: str, schema: List[SchemaField]):
    bigquery_client.create_table(Table(f"{PROJECT_ID}.{dataset}.{table_name}", schema))

def insert_intent(dataset: str, table_name: str, values: str):
    bigquery_client.query(
            f"""
                INSERT INTO `{dataset}.{table_name}` 
                VALUES({values});
            """
    ).result()