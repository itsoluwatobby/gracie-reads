import { useAppContext } from '../hooks';

type PageHeaderProps = {
  prefix?: string;
}
export default function PageHeader({ prefix }: PageHeaderProps) {
  const { appInfo } = useAppContext() as AppContextProps

  return (
    <p className="fluid-text self-start transition-transform text-black tracking-wide font-bold mobile:text-3xl">
      {prefix} {appInfo.name}.
    </p>
  )
}