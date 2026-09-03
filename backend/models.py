from pydantic import BaseModel, Field


class ChatTurn(BaseModel):
    role: str = Field(pattern="^(user|assistant)$")
    content: str = Field(max_length=3000)


class ChatRequest(BaseModel):
    query: str = Field(min_length=3, max_length=700)
    history: list[ChatTurn] = Field(default_factory=list, max_length=8)


class Source(BaseModel):
    id: str
    title: str
    url: str
    text: str


class ChatResponse(BaseModel):
    conversationId: str
    answer: str
    sources: list[Source]
