# Medical--Chatbot-Project

# How to run?
### STEPS:

Clone the repository

'''bash
Project repp:https://github.com/
'''
### STEP 01-Crate a conda environment after opening the repository

'''bash
conda create -n medibot python=3.10 -y
'''

'''bash
conda activate medibot
'''

### STEP 02-install the requirements
'''
bash
pip install -r requirements.txt
'''

### Create a ".env" file in the root directory and add your pinecone and openai credentials as follows:

'''ini
PINECONE_API_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
OPENAI_API_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
'''

''' bash
* run the following command to store embeddings to pipeline
python store_index.py
'''

'''bash
* Finally run the following command
python app.py

Now,
'''bash
open up localhost:8080
'''

|
 *** Techstack Used:
 - Python
 - Langchain
 - Flask
 - GPT
 - Pinecone

