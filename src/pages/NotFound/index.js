import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
export default function NotFound() {
  const [count, setCount] = useState(5)
  const history = useHistory()
  // 如果将两个useEffect写入一个useEffect，那么就要写依赖项，
  // 当count值改变时，定时器就会被重复执行，也就是会执行多个定时器
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])
  useEffect(() => {
    if (count === 0) {
      history.replace('/home')
    }
  }, [count, history])
  return (
    <div>
      <h1>对不起，您访问的页面不存在</h1>
      <p>
        {count}秒后自动返回主页，或点击<Link to="home">此处</Link>
      </p>
    </div>
  )
}
