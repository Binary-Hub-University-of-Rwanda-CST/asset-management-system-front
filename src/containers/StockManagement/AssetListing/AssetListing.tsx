// src/AssetListing.tsx
import React from "react";

const AssetListing: React.FC = () => {
  const sampleData = [
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
    // Add more sample data as needed

  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "10%",
        right: "10%",
        bottom: "0%",
        height: "70vh",
        backgroundColor: "white",
        padding: "20px",
        border: "1px solid #ccc",
        background: "#FFF",
        borderRadius: "18px 18px 0px 0px",
        color: "black",
      }}
    >
      <div>
        <button style={{borderRadius: "8px",background: "#F2F2F2",color: "black"}}>Back to list</button>
        <h2 style={{ display: "inline", marginLeft: "10px",borderRadius: "8px"}}>
          Muhabura Store
        </h2>
        <div
          style={{
            display: "inline-block",
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "lightblue",
            borderRadius: "4px",
          }}
        >
          Desktop
        </div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <input type="text" placeholder="Search..." style={{ width: "80%",height: "5vh", borderRadius: "6px",border: "none",
background: "#F3F3F3"}} />
        <button style={{ backgroundColor: "green", marginLeft: "70px",borderRadius: "6px",
background:" #00AB59" }}>
          Export
        </button>
      </div>
      <div style={{ marginTop: "10px" , textAlign: "center"}}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Asset Id</th>
              <th>Category Id</th>
              <th>Brand Id</th>
              <th>Stock Id</th>
              <th>Supplier Id</th>
              <th>Purchase Order No</th>
              <th>Asset value</th>
              <th>Life Span_Years</th>
              <th>Date In</th>
            </tr>
          </thead>
          <tbody>
            {sampleData.map((asset, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{asset.asset_id}</td>
                <td>{asset.category_id}</td>
                <td>{asset.brand_id}</td>
                <td>{asset.stock_id}</td>
                <td>{asset.supplier_id}</td>
                <td>{asset.purchase_order_number}</td>
                <td>{asset.value}</td>
                <td>{asset.life_span_years}</td>
                <td>{asset.date_in}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetListing;
