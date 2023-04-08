import { Select } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels } from '@/store/actions'
export const Channels = ({ value, onChange, width }) => {
  const dispatch = useDispatch()
  const { channels } = useSelector((value) => value.article)
  useEffect(() => {
    dispatch(getChannels())
  }, [dispatch])
  return (
    <Select
      style={{
        width,
      }}
      placeholder="请选择文章频道"
      value={value}
      onChange={onChange}
    >
      {channels.map((items) => (
        <Select.Option key={items.id} value={items.id}>
          {items.name}
        </Select.Option>
      ))}
    </Select>
  )
}
