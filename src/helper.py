from langchain.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from typing import List
from langchain.schema import Document


## Extract data from pdf file
def load_pdf_file(data_path="../data"):

    loader=DirectoryLoader(
        data_path,
        glob="*.pdf",
        loader_cls=PyPDFLoader
    )

    documents=loader.load()
    return documents



def filter_to_minimal_docs(docs:List[Document])->List[Document]:
    """
    Given a list of Document objects. return a new list of Document objects
    containing only 'source' in metadata and the original page_content.
    """

    minimal_docs:List[Document]=[]
    for doc in docs:
        src=doc.metadata.get("source")
        minimal_docs.append(
            Document(
                page_content=doc.page_content,
                metadata={"source":src}
            )
        )

    return minimal_docs


## Split the data into text chunks
def text_split(minimal_docs):
    text_spliter=RecursiveCharacterTextSplitter(chunk_size=500,chunk_overlap=20)
    text_chunks=text_spliter.split_documents(minimal_docs)
    return text_chunks

## Download the embeddings from the huggingface
def download_hugging_face_embeddings():
    embeddings=HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    return embeddings