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
  user: [
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
  ],
};

export const columnsReportPackage = (code) => [
  {
    title: 'Gói',
    width: '10%',
    children: [
      {
        title: 'Ngày',
        dataIndex: 'summaryDate',
        key: 'summaryDate',
        width: '13.3%',
      },
    ],
  },
  {
    title: `${code ? code : ''}`,

    children: [
      {
        title: 'Số lượt đăng ký (1)',
        dataIndex: 'register',
        key: 'register',
        width: '13.3%',
        render: (text, record) => {
          const SumContact = record.successCount + record.failCount;
          return <span>{SumContact}</span>;
        },
      },
      {
        title: 'Đăng Ký Thành Công (2)',
        dataIndex: 'successCount',
        key: 'successCount',
        width: '13.3%',
      },
      {
        title: 'Tỷ lệ đăng ký thành công (3)=(2)/(1)',
        dataIndex: 'percentSuccess',
        key: 'percentSuccess',
        width: '13.3%',
        render: (text, record) => {
          const averageContact = record.successCount + record.failCount > 0 ? ((100 * record.successCount) / (record.successCount + record.failCount)).toFixed(2) : 0;
          return <span>{averageContact + '%'}</span>;
        },
      },
      {
        title: 'Đăng Ký Thất bại (4)=(1)-(2) ',
        dataIndex: 'failCount',
        key: 'failCount',
        width: '13.3%',
      },
    ],
  },
];

export const columnTableUser1 = {
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
