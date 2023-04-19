import { Table, Input, Space } from 'antd';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callApiDeletePhim, layDanhSachFim } from '../../../redux/quanLyPhimSlice';
import {EditOutlined, DeleteOutlined,CalendarOutlined  } from '@ant-design/icons'
import { history } from '../../../util/settings/config';
import { NavLink } from 'react-router-dom';
const { Search } = Input;

function Phim() {
const columns = [
  {
    title: 'Mã Phim',
    dataIndex: 'maPhim',
    sorter: (a,b) => a.maPhim - b.maPhim
  },
  {
    title: 'Hình Ảnh',
    dataIndex: 'hinhAnh',    
   render: (text,record,index) => {return <Fragment>
    <img style={{width: '50px', height: '50px'}} src={record.hinhAnh} alt={record.tenPhim} /* onError={(e)=> e.target.onError = null; e.target.src='https://picsum.photos/50/50'} *//>
   </Fragment>}
  },
  {
    title: 'Tên Phim',
    dataIndex: 'tenPhim',
    sorter: (a, b) =>{ 
      let tenPhimA = a.tenPhim.toLowerCase().trim();
      let tenPhimB = b.tenPhim.toLowerCase().trim();
      if(tenPhimA > tenPhimB){
        return 1
      }
      return -1
    }
  },
  {
    title: 'Mô tả',
    dataIndex: 'moTa',
    sorter: (a,b) => a.moTa - b.moTa,
    render: (text,film,index) =>{return (
      <Fragment>
        {film.moTa.length > 30 ? film.moTa.substr(0,30) + '...' : film.moTa}
      </Fragment>
    )}
  },
  {
    title: 'Action',
    key: 'action',
    render: (text,film,index) => ( 
      <Space size="middle">        
        <NavLink to={`/admin/edit/${film.maPhim}`} title="Edit" className='btn btn-outline-warning btn-sm'><EditOutlined /></NavLink>
        <button title='Delete' className='btn btn-outline-danger btn-sm' onClick={()=>{ dispatch(callApiDeletePhim(film.maPhim))}}><DeleteOutlined /></button> 
        <NavLink to={`/admin/showtime/${film.maPhim}`} title="Tạo lịch chiếu" className='btn btn-outline-success btn-sm'><CalendarOutlined /></NavLink>

      </Space>
    ),
  },
]


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const onSearch = (value) =>{ dispatch(layDanhSachFim(value))};



 
const {arrFim} = useSelector(state=> state.quanLyFimSlice)

const dispatch = useDispatch()
useEffect(()=>{
  const actionThunk = layDanhSachFim()
  dispatch(actionThunk)
},[])

  return (
    <div>
       <h1 className='h1'>Quản Lý Phim</h1>
       <button className='btn btn-outline-primary btn-sm mb-1' onClick={()=>{ history.push('/admin/addnew')}}><b>Thêm phim</b></button>
      <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: '100%' }} />
      <Table columns={columns} dataSource={arrFim} onChange={onChange} rowkey={'maPhim'} />
    </div>
  )
};
export default Phim





const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];
