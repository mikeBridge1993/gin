import React from "react"
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
import UsersList from "../../components/UsersList"

const mockedUsers = [
  {
    login: "A",
    id: 1410106,
    node_id: "MDQ6VXNlcjE0MTAxMDY=",
    avatar_url: "https://avatars2.githubusercontent.com/u/1410106?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/A",
    html_url: "https://github.com/A",
    followers_url: "https://api.github.com/users/A/followers",
    following_url: "https://api.github.com/users/A/following{/other_user}",
    gists_url: "https://api.github.com/users/A/gists{/gist_id}",
    starred_url: "https://api.github.com/users/A/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/A/subscriptions",
    organizations_url: "https://api.github.com/users/A/orgs",
    repos_url: "https://api.github.com/users/A/repos",
    events_url: "https://api.github.com/users/A/events{/privacy}",
    received_events_url: "https://api.github.com/users/A/received_events",
    type: "User",
    site_admin: false,
    score: 1
  },
  {
    login: "Au-2020",
    id: 44748278,
    node_id: "MDQ6VXNlcjQ0NzQ4Mjc4",
    avatar_url: "https://avatars1.githubusercontent.com/u/44748278?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/Au-2020",
    html_url: "https://github.com/Au-2020",
    followers_url: "https://api.github.com/users/Au-2020/followers",
    following_url:
      "https://api.github.com/users/Au-2020/following{/other_user}",
    gists_url: "https://api.github.com/users/Au-2020/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Au-2020/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Au-2020/subscriptions",
    organizations_url: "https://api.github.com/users/Au-2020/orgs",
    repos_url: "https://api.github.com/users/Au-2020/repos",
    events_url: "https://api.github.com/users/Au-2020/events{/privacy}",
    received_events_url: "https://api.github.com/users/Au-2020/received_events",
    type: "User",
    site_admin: false,
    score: 1
  },
  {
    login: "snyff",
    id: 45491,
    node_id: "MDQ6VXNlcjQ1NDkx",
    avatar_url: "https://avatars1.githubusercontent.com/u/45491?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/snyff",
    html_url: "https://github.com/snyff",
    followers_url: "https://api.github.com/users/snyff/followers",
    following_url: "https://api.github.com/users/snyff/following{/other_user}",
    gists_url: "https://api.github.com/users/snyff/gists{/gist_id}",
    starred_url: "https://api.github.com/users/snyff/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/snyff/subscriptions",
    organizations_url: "https://api.github.com/users/snyff/orgs",
    repos_url: "https://api.github.com/users/snyff/repos",
    events_url: "https://api.github.com/users/snyff/events{/privacy}",
    received_events_url: "https://api.github.com/users/snyff/received_events",
    type: "User",
    site_admin: false,
    score: 1
  },
  {
    login: "Amichai",
    id: 313874,
    node_id: "MDQ6VXNlcjMxMzg3NA==",
    avatar_url: "https://avatars3.githubusercontent.com/u/313874?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/Amichai",
    html_url: "https://github.com/Amichai",
    followers_url: "https://api.github.com/users/Amichai/followers",
    following_url:
      "https://api.github.com/users/Amichai/following{/other_user}",
    gists_url: "https://api.github.com/users/Amichai/gists{/gist_id}",
    starred_url: "https://api.github.com/users/Amichai/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/Amichai/subscriptions",
    organizations_url: "https://api.github.com/users/Amichai/orgs",
    repos_url: "https://api.github.com/users/Amichai/repos",
    events_url: "https://api.github.com/users/Amichai/events{/privacy}",
    received_events_url: "https://api.github.com/users/Amichai/received_events",
    type: "User",
    site_admin: false,
    score: 1
  },
  {
    login: "adamwiggins",
    id: 177,
    node_id: "MDQ6VXNlcjE3Nw==",
    avatar_url: "https://avatars0.githubusercontent.com/u/177?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/adamwiggins",
    html_url: "https://github.com/adamwiggins",
    followers_url: "https://api.github.com/users/adamwiggins/followers",
    following_url:
      "https://api.github.com/users/adamwiggins/following{/other_user}",
    gists_url: "https://api.github.com/users/adamwiggins/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/adamwiggins/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/adamwiggins/subscriptions",
    organizations_url: "https://api.github.com/users/adamwiggins/orgs",
    repos_url: "https://api.github.com/users/adamwiggins/repos",
    events_url: "https://api.github.com/users/adamwiggins/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/adamwiggins/received_events",
    type: "User",
    site_admin: false,
    score: 1
  }
]

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ items: mockedUsers })
    })
  )
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe("UsersList component", () => {
  test("it should snapshot users list", () => {
    const container = render(<UsersList />)
    expect(container).toMatchSnapshot()
  })

  test("it should should render the correct number of list items, after inserting text in the search input", async () => {
    render(<UsersList />)
    const searchInput = screen.getByTestId("search-input")
    act(() => {
      fireEvent.change(searchInput, {
        target: { value: "s" }
      })
    })

    expect(fetch).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      const numberOfUsers = screen.getAllByTestId("user").length
      expect(numberOfUsers).toBe(mockedUsers.length)
    })
  })
})
