"""
Package initializer for the `app` package.

This exposes the FastAPI instance as `app` so that running
`uvicorn app:app --reload` from the backend directory works.
"""

from app.app import app  # noqa: F401


