import React, { useState } from 'react';
import { technologies } from './ListOfTechnologies';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button  } from '@mui/material';


function JobDescriptionParser() {
  const [jobDescriptions, setJobDescriptions] = useState('');
  const [technologyCounts, setTechnologyCounts] = useState({});

  const handleInputChange = (event) => {
    setJobDescriptions(event.target.value);
  };

//   const handleParseClick = () => {
//     const counts = {};

//     technologies.forEach((tech) => {
//     //   const regex = new RegExp(`\\b${tech}\\b`, 'gi');
//     const regex = new RegExp(`(?:^|\\s|[.])${tech}(?:$|\\s|[.#])`, 'gi');
//       const matches = jobDescriptions.match(regex);
//       counts[tech] = matches ? matches.length : 0;
//     });

//     setTechnologyCounts(counts);
//     console.log(technologyCounts)
//   };
const handleParseClick = () => {
    const matchedTechnologies = {};
  
    for (const category in technologies) {
      matchedTechnologies[category] = {};
      for (const technology in technologies[category]) {
        const regex = new RegExp(`(?:^|\\s|[.])${technology}(?:$|\\s|[.#])`, 'gi');
        const matches = jobDescriptions.match(regex);
        const count = matches ? matches.length : 0;
        matchedTechnologies[category][technology] = count;
      }
    }
  
    setTechnologyCounts(matchedTechnologies);
    console.log(matchedTechnologies);
  };

  return (
    <div >
      <h2>Job Description Parser</h2>
      <textarea
        rows="10"
        cols="50"
        value={jobDescriptions}
        onChange={handleInputChange}
        placeholder="Enter job descriptions here..."
      ></textarea>
      <br />
      <Button variant="contained" color="success" onClick={handleParseClick}>Parse</Button>
      <h3>Technology Counts:</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Object.entries(technologyCounts).map(([category, technologies]) => (
      <div key={category} style={{ marginBottom: '20px' }}>
        <Typography variant="h5" component="h3" style={{ margin: '10px' }}>{category}</Typography>
        <TableContainer component={Paper} >
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>Technology</TableCell>
                <TableCell align="right">Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(technologies).sort(([techA, countA], [techB, countB]) => countB - countA).map(([technology, count]) => {
                if (count > 0) {
                  return (
                    <TableRow key={technology}>
                      <TableCell component="th" scope="row">{technology}</TableCell>
                      <TableCell align="right">{count}</TableCell>
                    </TableRow>
                  );
                }
                return null;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    ))}
    </div>
    </div>
  );
}

export default JobDescriptionParser;