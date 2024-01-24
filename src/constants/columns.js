export const columnTablePackage = {
  write: [
    {
      title: 'Mã gói cước',
      dataIndex: 'code',
      width: '10%',
    },
    {
      title: 'Nhà cung cấp ',
      dataIndex: 'provider',
      width: '10%',
      render: (provider) => `${provider}`,
    },
    {
      title: 'GIá gói đăng ký',
      dataIndex: 'price',
      key: 'price',

      sorter: (a, b) => a.price - b.price,
    },

    {
      title: 'Thời hạn ',
      dataIndex: 'cycle',
      key: 'cycle',

      filters: [
        {
          text: 'ngày',
          value: 'ngày',
        },
        {
          text: 'tháng',
          value: 'tháng',
        },

        {
          text: 'năm',
          value: 'năm',
        },
      ],

      onFilter: (value, record) => record.cycle.includes(value),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => `${status}`,
    },

    {
      title: 'Lựa chọn',
      dataIndex: 'operation',
    },
  ],
  read: [
    {
      title: 'Mã gói cước',
      dataIndex: 'code',
      width: '10%',
    },
    {
      title: 'Nhà cung cấp ',
      dataIndex: 'provider',
      width: '10%',
      render: (provider) => `${provider}`,
    },
    {
      title: 'GIá gói đăng ký',
      dataIndex: 'price',
      key: 'price',

      sorter: (a, b) => a.price - b.price,
    },

    {
      title: 'Thời hạn ',
      dataIndex: 'cycle',
      key: 'cycle',

      filters: [
        {
          text: 'ngày',
          value: 'ngày',
        },
        {
          text: 'tháng',
          value: 'tháng',
        },

        {
          text: 'năm',
          value: 'năm',
        },
      ],

      onFilter: (value, record) => record.cycle.includes(value),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (status) => `${status}`,
    },
  ],
};

export const columnTableUser = {
  admin: [
    {
      title: 'STT',
      dataIndex: 'index',

      render: (index) => `${index}`,
      width: '10%',
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      width: '20%',
      sorter: (a, b) => a.username.localeCompare(b.name),
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
    },
    {
      title: 'Lần đăng nhập gần nhất',
      dataIndex: 'last_time',
    },
    {
      title: 'Lựa chọn',
      dataIndex: 'operation',
    },
  ],
};
