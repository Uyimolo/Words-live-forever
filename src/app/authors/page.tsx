import AuthorsList from "@/components/authors/AuthorsList"

const fetchAuthors = async () => {
    const response = await fetch(`https://api.quotable.io/authors`)
    const data = response.json()
    console.log(data)
    return data
}

const page = async () => {
    const authors = await fetchAuthors()
  return (
      <AuthorsList authorsData={ authors} />
  )
}

export default page
