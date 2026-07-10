import { savePost, serializePost, type PostData } from "@/lib/markdown"

type PostInput = Omit<PostData, "slug"> & { slug?: string }

type GitHubContentResponse = {
  sha?: string
}

function githubConfig() {
  return {
    token: process.env.GITHUB_CONTENT_TOKEN,
    repository: process.env.GITHUB_CONTENT_REPOSITORY || "Ren-0804/websit",
    branch: process.env.GITHUB_CONTENT_BRANCH || "main",
  }
}

async function getExistingSha(apiUrl: string, token: string, branch: string) {
  const response = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  })

  if (response.status === 404) return undefined
  if (!response.ok) throw new Error(`GitHub content lookup failed with ${response.status}`)

  const result = (await response.json()) as GitHubContentResponse
  return result.sha
}

async function publishToGitHub(data: PostInput) {
  const { token, repository, branch } = githubConfig()
  if (!token) throw new Error("GITHUB_CONTENT_TOKEN is required for production publishing")

  const serialized = serializePost(data)
  const path = `content/posts/${serialized.slug}.md`
  const apiUrl = `https://api.github.com/repos/${repository}/contents/${path}`
  const existingSha = await getExistingSha(apiUrl, token, branch)

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      message: `${data.status === "draft" ? "draft" : "publish"}: ${data.title}`,
      content: Buffer.from(serialized.content, "utf8").toString("base64"),
      branch,
      ...(existingSha ? { sha: existingSha } : {}),
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    console.error("GitHub content publish failed:", response.status, details)
    throw new Error(`GitHub content publish failed with ${response.status}`)
  }

  return serialized.slug
}

export async function publishPost(data: PostInput) {
  const { token } = githubConfig()

  if (token) {
    return publishToGitHub(data)
  }

  if (process.env.VERCEL) {
    throw new Error("Production publishing is not configured. Set GITHUB_CONTENT_TOKEN.")
  }

  return savePost(data)
}
