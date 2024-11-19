const assets = [
    {
          "asset_id": "123456",
          "category_id": "c1",
          "brand_id": "b1",
          "stock_id": "s1",
          "supplier_id": "supp1",
          "purchase_order_number": "PO123",
          "value": 1200,
          "life_span_years": 3,
          "date_in": "2023-01-01",
          "category": {
            "asset_category_id": "c1",
            "category_name": "computer",
            "specifications": [
              {
                "id": "5eb042eb-9e05-4770-bb98-4aa25a1cf408",
                "name": "cpu",
                "values": [
                  "i3",
                  "i5",
                  "i7"
                ],
                "category_id": "c1"
              }
            ]
          },
          "brand": {
            "id": "b1",
            "name": "HP"
          },
          "stock": {
            "id": "s1",
            "name": "Muhabura Store"
          },
          "supplier": {
            "id": "supp1",
            "name": "University of Rwanda"
          }
        },
        {
          "asset_id": "789012",
          "category_id": "c1",
          "brand_id": "b2",
          "stock_id": "s1",
          "supplier_id": "supp2",
          "purchase_order_number": "PO456",
          "value": 1500,
          "life_span_years": 5,
          "date_in": "2023-02-15",
          "category": {
            "asset_category_id": "c1",
            "category_name": "computer",
            "specifications": [
              {
                "id": "5eb042eb-9e05-4770-bb98-4aa25a1cf408",
                "name": "cpu",
                "values": [
                  "i3",
                  "i5",
                  "i7"
                ],
                "category_id": "c1"
              }
            ]
          },
          "brand": {
            "id": "b2",
            "name": "Dell"
          },
          "stock": {
            "id": "s1",
            "name": "Muhabura Store"
          },
          "supplier": {
            "id": "supp2",
            "name": "Tech Solutions Inc."
          }
        },
        {
          "asset_id": "345678",
          "category_id": "c1",
          "brand_id": "b3",
          "stock_id": "s1",
          "supplier_id": "supp3",
          "purchase_order_number": "PO789",
          "value": 1000,
          "life_span_years": 4,
          "date_in": "2023-03-20",
          "category": {
            "asset_category_id": "c1",
            "category_name": "computer",
            "specifications": [
              {
                "id": "5eb042eb-9e05-4770-bb98-4aa25a1cf408",
                "name": "cpu",
                "values": [
                  "i3",
                  "i5",
                  "i7"
                ],
                "category_id": "c1"
              }
            ]
          },
          "brand": {
            "id": "b3",
            "name": "Lenovo"
          },
          "stock": {
            "id": "s1",
            "name": "Muhabura Store"
          },
          "supplier": {
            "id": "supp3",
            "name": "Global Electronics"
          }
        },
        {
          "asset_id": "1234856",
          "category_id": "c1",
          "brand_id": "b1",
          "stock_id": "s1",
          "supplier_id": "supp1",
          "purchase_order_number": "PO123",
          "value": 1200,
          "life_span_years": 3,
          "date_in": "2023-01-01",
          "category": {
            "asset_category_id": "c1",
            "category_name": "computer",
            "specifications": [
              {
                "id": "5eb042eb-9e05-4770-bb98-4aa25a1cf408",
                "name": "cpu",
                "values": [
                  "i3",
                  "i5",
                  "i7"
                ],
                "category_id": "c1"
              }
            ]
          },
          "brand": {
            "id": "b1",
            "name": "HP"
          },
          "stock": {
            "id": "s1",
            "name": "Muhabura Store"
          },
          "supplier": {
            "id": "supp1",
            "name": "University of Rwanda"
          }
        },
        {
          "asset_id": "789013",
          "category_id": "c1",
          "brand_id": "b2",
          "stock_id": "s1",
          "supplier_id": "supp2",
          "purchase_order_number": "PO456",
          "value": 1500,
          "life_span_years": 5,
          "date_in": "2023-02-15",
          "category": {
            "asset_category_id": "c1",
            "category_name": "computer",
            "specifications": [
              {
                "id": "5eb042eb-9e05-4770-bb98-4aa25a1cf408",
                "name": "cpu",
                "values": [
                  "i3",
                  "i5",
                  "i7"
                ],
                "category_id": "c1"
              }
            ]
          },
          "brand": {
            "id": "b2",
            "name": "Dell"
          },
          "stock": {
            "id": "s1",
            "name": "Muhabura Store"
          },
          "supplier": {
            "id": "supp2",
            "name": "Tech Solutions Inc."
          }
        },
        {
          "asset_id": "1789013",
          "category_id": "c1",
          "brand_id": "b2",
          "stock_id": "s1",
          "supplier_id": "supp2",
          "purchase_order_number": "PO456",
          "value": 1500,
          "life_span_years": 5,
          "date_in": "2023-02-15",
          "category": {
            "asset_category_id": "c1",
            "category_name": "computer",
            "specifications": [
              {
                "id": "5eb042eb-9e05-4770-bb98-4aa25a1cf408",
                "name": "cpu",
                "values": [
                  "i3",
                  "i5",
                  "i7"
                ],
                "category_id": "c1"
              }
            ]
          },
          "brand": {
            "id": "b2",
            "name": "Dell"
          },
          "stock": {
            "id": "s1",
            "name": "Muhabura Store"
          },
          "supplier": {
            "id": "supp2",
            "name": "Tech Solutions Inc."
          }
        },
        {
          "asset_id": "11",
          "category_id": "c1",
          "brand_id": "b2",
          "stock_id": "s1",
          "supplier_id": "supp2",
          "purchase_order_number": "PO456",
          "value": 1500,
          "life_span_years": 5,
          "date_in": "2023-02-15",
          "category": {
            "asset_category_id": "c1",
            "category_name": "computer",
            "specifications": [
              {
                "id": "5eb042eb-9e05-4770-bb98-4aa25a1cf408",
                "name": "cpu",
                "values": [
                  "i3",
                  "i5",
                  "i7"
                ],
                "category_id": "c1"
              }
            ]
          },
          "brand": {
            "id": "b2",
            "name": "Dell"
          },
          "stock": {
            "id": "s1",
            "name": "Muhabura Store"
          },
          "supplier": {
            "id": "supp2",
            "name": "Tech Solutions Inc."
          }
        },
        {
          "asset_id": "22",
          "category_id": "c1",
          "brand_id": "b3",
          "stock_id": "s1",
          "supplier_id": "supp3",
          "purchase_order_number": "PO789",
          "value": 1000,
          "life_span_years": 4,
          "date_in": "2023-03-20",
          "category": {
            "asset_category_id": "c1",
            "category_name": "computer",
            "specifications": [
              {
                "id": "5eb042eb-9e05-4770-bb98-4aa25a1cf408",
                "name": "cpu",
                "values": [
                  "i3",
                  "i5",
                  "i7"
                ],
                "category_id": "c1"
              }
            ]
          },
          "brand": {
            "id": "b3",
            "name": "Lenovo"
          },
          "stock": {
            "id": "s1",
            "name": "Muhabura Store"
          },
          "supplier": {
            "id": "supp3",
            "name": "Global Electronics"
          }
        },
        {
          "asset_id": "33",
          "category_id": "c1",
          "brand_id": "b1",
          "stock_id": "s1",
          "supplier_id": "supp1",
          "purchase_order_number": "PO123",
          "value": 1200,
          "life_span_years": 3,
          "date_in": "2023-01-01",
          "category": {
            "asset_category_id": "c1",
            "category_name": "computer",
            "specifications": [
              {
                "id": "5eb042eb-9e05-4770-bb98-4aa25a1cf408",
                "name": "cpu",
                "values": [
                  "i3",
                  "i5",
                  "i7"
                ],
                "category_id": "c1"
              }
            ]
          },
          "brand": {
            "id": "b1",
            "name": "HP"
          },
          "stock": {
            "id": "s1",
            "name": "Muhabura Store"
          },
          "supplier": {
            "id": "supp1",
            "name": "University of Rwanda"
          }
        }
      ]
      export default assets; 