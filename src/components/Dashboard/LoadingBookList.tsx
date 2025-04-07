

export default function LoadingBookList() {

  return (
    <tbody className="divide-y divide-gray-200 text-sm">
      {
        [...Array(6).keys()].map((i) => (
          <tr key={i}
            className='transition-transform'
          >
            <ContentLoading />
            <ContentLoading width='w-5' />
            <ContentLoading width='w-5' />
            <ContentLoading width='w-5' />
            <ContentLoading width='w-5' />
            <ContentLoading width="w-12" />
            <td className="px-2 py-4">
              <div className="mx-auto flex justify-center gap-x-3">
                <span className="bg-gray-200 w-4 h-5 animate-pulse" />
                <span className="bg-gray-200 w-4 h-5 animate-pulse" />
              </div>
            </td>
          </tr>
        ))
      }
    </tbody>
  )
}

type ContentLoadingProps = {
  width?: string;
}
const ContentLoading = ({ width = 'w-24' }: ContentLoadingProps) => {
  return (
    <td className='px-2 py-4'>
      <div className={`bg-gray-200 mx-auto ${width} h-5 animate-pulse`} />
    </td>

  )
}