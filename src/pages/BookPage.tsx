import { useParams } from "react-router-dom"

export default function BookPage() {
  const { bookId } = useParams();

  return (
    <div>BookPage {bookId}</div>
  )
}