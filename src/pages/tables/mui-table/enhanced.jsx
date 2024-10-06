import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import { toast } from 'react-toastify';
// project imports
import MainCard from 'components/MainCard';
import Typography from '@mui/material/Typography';
// import { CSVExport, RowSelection } from 'components/third-party/react-table';

// table data
function createData(number,address, total, profit, rate, buy,token) {
  return {
    number,
    address,
    total,
    profit,
    rate,
    buy,
    token
  };
}

// table data
const rows = [
  createData(1,'Cupcake', 305, 3.7, 67, 4.3,2),
  createData(2,'Donut', 452, 25.0, 51, 4.9,6),
];

// table filter
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// table header
const headCells = [
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: '#'
  },
  {
    id: 'Address',
    numeric: false,
    disablePadding: true,
    label: 'Address'
  },
  {
    id: 'Total_PNL',
    numeric: true,
    disablePadding: false,
    label: 'Total RD'
  },
  {
    id: 'Total_Profit',
    numeric: true,
    disablePadding: false,
    label: 'Total Profit'
  },
  {
    id: 'Win_Rate',
    numeric: true,
    disablePadding: false,
    label: 'Win Rate'
  },
  {
    id: 'Avg_Buy_Price',
    numeric: true,
    disablePadding: false,
    label: 'Avg buy rate'
  },
  {
    id: 'Token_Traded',
    numeric: true,
    disablePadding: false,
    label: 'Token traded'
  }
];

// ==============================|| MUI TABLE - HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox" sx={{ pl: 3 }}>
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts'
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'none'}
            sortDirection={orderBy === headCell.id ? order : undefined}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// ==============================|| TABLE - ENHANCED ||============================== //

export default function EnhancedTable() {

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedValue, setSelectedValue] = React.useState([]);
  const [dexItem, setDexItem] = React.useState([]);
  useEffect(() => {
    const fetchDexItem = async () => {
      try {
        const response = await axios.get('http://dex-admin-view.vercel.app');  // Fetch the data
        console.log(response.data);
        setDexItem(response.data);  // Update state with the fetched data
      } catch (err) {
        setError(err);  // Set error state if the request fails
      } 
    };

    fetchDexItem();  // Call the function to fetch data
  }, []);  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const copyToClipboard = (text) => {  
    navigator.clipboard.writeText(text)  
        .then(() => {  
          toast.success('Copied successfully!', { autoClose: 2000 });
            console.log('Address copied to clipboard:', text);  
            // Optionally, you can show a notification here  
        })  
        .catch(err => {  
            console.error('Failed to copy: ', err);  
        });  
};  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedId = dexItem.map((n) => n.name);
      setSelected(newSelectedId);
      return;
    }
    setSelected([]);
  };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
  //   }
  //   const selectedRowData = dexItem.filter((row) => newSelected.includes(row.name.toString()));
  //   setSelectedValue(selectedRowData);
  //   setSelected(newSelected);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event?.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dexItem.length) : 0;

  return (
    <MainCard
      content={false}
      title="Top profit 200"
      // secondary={<CSVExport data={selectedValue.length > 0 ? selectedValue : rows} filename={'enhanced-table-data.csv'} />}
    >
      {/* <RowSelection selected={selected.length} /> */}

      {/* table */}
      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={dexItem.length}
          />
          <TableBody>
            {stableSort(dexItem, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                if (typeof row === 'number') return null;
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    {/* <TableCell sx={{ pl: 3 }} padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </TableCell> */}
                    <TableCell align="left">{index+1}</TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none" style={{ width: '40%' }}>
                        <Typography fontSize={12}>Profit Top 200 Dynamic:&nbsp;{row.Address}</Typography>
                    </TableCell>
                    <TableCell align="left">
                        <Typography sx={{backgroundColor:'#094B0C', px:'8px', fontSize:'12px', color:'#5F9A64', display:'inline-block'}}>
                        {row.Total_PNL ? row.Total_PNL.toFixed(2) : '0.00'}x
                        </Typography>
                    </TableCell>
                    <TableCell align="left" ><Typography color='#D9A23B' fontSize={12}>{row.Total_Profit ? row.Total_Profit.toFixed(2) : '0.00'}</Typography></TableCell>
                    <TableCell align="center">
                      <Typography fontSize={12}>
                      {row.Win_Rate ? row.Win_Rate.toFixed(2) : '0.00'}%
                      </Typography>
                      <Box sx={{display:'flex',justifyContent:'center',gap:'5px'}}>
                          <Typography fontSize={9}>Win&nbsp;:&nbsp;{row.Token_win_traded}</Typography>
                          <Typography fontSize={9}>Lose&nbsp;:&nbsp;{row.Token_Traded-row.Token_win_traded}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ pr: 3 }} align="center">
                      {row.Avg_Buy_Price ? row.Avg_Buy_Price.toFixed(2) : '0.00'}
                    </TableCell>
                    <TableCell sx={{ pr: 3}} align="right">
                      <Box sx={{minWidth:'150px'}}> 
                        {row.Token_Traded}&nbsp;&nbsp;<Button onClick={() => copyToClipboard(row)}><Typography sx={{backgroundColor:'yellow',borderRadius:'10px',p:'1px'}}>Copy trade</Typography></Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow sx={{ height: (dense ? 33 : 53) * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />

      {/* table pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dexItem.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
}

EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.any,
  order: PropTypes.any,
  orderBy: PropTypes.any,
  numSelected: PropTypes.any,
  rowCount: PropTypes.any,
  onRequestSort: PropTypes.any
};
