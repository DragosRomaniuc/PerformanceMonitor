import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import MemoryIcon from '@material-ui/icons/Memory';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  statusActive:{
    color: theme.palette.primary[100]
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  }
}));

function formatBytes(a,b){if(0===a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}
function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    // var divisor_for_seconds = divisor_for_minutes % 60;
    // var seconds = Math.ceil(divisor_for_seconds);
    return `${hours}h ${minutes}m`
}
export default function Album(props) {
  const classes = useStyles();
    // console.log(props.machines,'props')
    let cards = [];
    for(let key in props.machines){
      cards.push(props.machines[key]);
    }
    // console.log(cards);
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MemoryIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Performance Monitor
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Performance Monitor
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {/* <div> */}
              {/* <div style={{textAlign: 'center'}}> */}
                  <span style={{ fontWeight: 700}}>Front End: </span> 
                  <span style={{ fontSize: 19}}>React, Socket.IO, Redux, React-Router,MaterialUI</span>
                  <span></span>
              {/* </div> */}
              {/* <div style={{textAlign: 'center'}}> */}
                  <span style={{ fontWeight: 700}}>BackEnd: </span> 
                  <span style={{ fontSize: 19}}>NodeJS and its modules(Cluster,OS), Socket.IO, Redis, MongoDB </span>
              {/* </div> */}
            {/* </div> */}
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                
                <Link href="https://github.com/DragosRomaniuc/PerformanceMonitor">
                  <Button variant="contained" color="primary">
                    GitHub
                  </Button>
                </Link>
                </Grid>
                <Grid item>
                <Link href="https://www.linkedin.com/in/dragos-romaniuc-b67946152/">
                  <Button variant="outlined" color="primary">
                    Linkedin
                  </Button>
                </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card.macA} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://previews.123rf.com/images/logos2012/logos20121512/logos2012151200015/49455517-dark-connection-background-with-place-for-text-2d-processor-chip.jpg"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                   
                   
                    <List component="nav" className={classes.root} aria-label="mailbox folders">
                    <ListItem >
                      <ListItemText primary="Mac Address" />
                      <ListItemText secondary={card.macA} />
                    </ListItem>
                    <Divider/>
                    <ListItem className={card.isActive===true ? classes.statusActive : 'nothing'}>
                      <ListItemText className={card.isActive===true ? classes.statusActive : 'nothing'} primary="Status:" />
                      <ListItemText className={card.isActive===true ? classes.statusActive : 'nothing'} secondary={card.isActive === true ? 'Active' : 'Inactive'} />
                    </ListItem>

                    <ListItem >
                      <ListItemText primary="Os Type" />
                      <ListItemText secondary={card.osType} />
                    </ListItem>

                    <ListItem >
                      <ListItemText primary="Os Architecture" />
                      <ListItemText secondary={card.osArch} />
                    </ListItem>

                    <ListItem >
                      <ListItemText primary="Cpu Model" />
                      <ListItemText secondary={card.cpu.model} />
                    </ListItem>
                    <ListItem >
                      <ListItemText primary="Cpu Cores" />
                      <ListItemText secondary={card.cpu.cores} />
                    </ListItem>
                    <ListItem className={card.isActive===true ? classes.statusActive : 'nothing'}>
                      <ListItemText primary="Cpu Load" />
                      <ListItemText secondary={`${card.cpu.load}%`} />
                    </ListItem>

                    <ListItem >
                      <ListItemText primary="Total Memory" />
                      <ListItemText secondary={formatBytes(card.totalMem,3)} />
                    </ListItem>

                    <ListItem >
                      <ListItemText primary="Used Memory" />
                      <ListItemText secondary={formatBytes(card.usedMem,3)} />
                    </ListItem>

                    <ListItem >
                      <ListItemText primary="Memory Usage" />
                      <ListItemText secondary={`${card.memUsage * 100} %`} />
                    </ListItem>

                    <ListItem >
                      <ListItemText primary="Up Time" />
                      <ListItemText secondary={secondsToTime(card.upTime)} />
                    </ListItem>

                    
    </List>
                  </CardContent>
                  
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Performance Monitor 
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}