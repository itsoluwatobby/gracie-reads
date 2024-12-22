import { useAppContext } from '../hooks';

export default function PageHeader() {
  const { appInfo } = useAppContext();

  return (
    <p className="fluid-text self-start transition-transform text-blue-50 tracking-wide font-bold mobile:text-3xl">
      {appInfo.name}.
    </p>
  )
}