# Data Flow Diagram


                        ┌──────────────┐
                        │   Text (symptoms, meds) → Tokenize + Pad + Embedding + LSTM
                        └──────┬───────┘
                               │
   Tabular data (age, gender, history) → Normalize → Dense layer ─┬─► Concatenate ─► Dense ─► Output
                                                                   │
  X-ray / Report Images → Resize → CNN (MobileNet/ResNet) ────────┘
