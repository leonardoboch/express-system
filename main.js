const { application } = require('express');
const express = require('express');
const si = require('systeminformation');
const time = require('date-and-time');
const app = express();
const pcData = {};
const cors = require('cors');
const os = require('os-utils');

app.listen(3000);
app.use(cors());

//criando uma instancia do express

app.use(express.urlencoded({extended: false}));

//DEVOLVE TODOS OS DADOS INICIALIZADOS - OK
app.get('/', (req,res) => {
    res.send(pcData);
})

app.get('/about', (req,res) => {
    res.send("Thanks for learning about us");
} );

//RETORNA A HORA ATUAL -- COLOCAR EM SCHEDULE - OK
app.get('/time', (req,res) => {
    res.send(actualTime());
});
///RETORNA TODAS INFOS DA RAM
app.get('/ram', (req,res) => {
  setRAM();
  res.send(pcData.RAM);
})
/// RETORNA RAM USADA -- COLOCAR SCHEDULE- OK
app.get('/ram-used',(req,res) => {
    res.send(usedRam());
});
/// RETORNA RAM LIVRE -- COLOCAR SCHEDULE - OK
app.get('/ram-free',(req,res)=>{
  res.send(freeRam());
});
//RETORNA TODA RAM - OK
app.get('/ram-total', (req, res) => {
  res.send(totalRam());
})

//RETORNA INFO DA CPU - OK
app.get('/info-cpu', (req, res) => {
  cpuInfo();
  res.send(pcData.cpuInfo);
})
/// RETORNA VELOCIDADE DA CPU -- COLOCAR SCHEDULE - OK
app.get('/cpu-speed', (req,res) =>{
  usedCpu();
  res.send(pcData.cpuCurrentSpeed);
});
// RETORNA PORCENTAGEM DA CPU
app.get('/cpu-percentage', (req, res) => {
  cpuPercentage();
  // res.sendStatus(pcData.cpuPercentage);
});
//RETORNA TEMPERATURA DA CPU -- COLOCAR SCHEDULE -OK
app.get('/cpu-temperature', (req, res) => {
  setCpuTemperature();
  res.send(pcData.cpuTemperature);
});
//RETORNA INFORMACAO DO HARDWARE --SEM SCHEDULE - OK
app.get('/info-hardware', (req,res) => {
  setHardwareInfo();
  res.send(pcData.hardware);
});
//RETORNA INFO DA BIOS - OK
app.get('/info-bios', (req,res) => {
  setBiosInfo();
  res.send(pcData.bios);
});
//RETORNA INFO PLACA MAE - OK
app.get('/info-mother-board', (req,res) => {
  setMotherBoard();
  res.send(pcData.motherBoard);
});

//RETORNA INFO MEMORIA RAM - OK
app.get('/info-ram', (req,res) => {
  setRamInfo();
  res.send(pcData.ramInfo);
});
//RETORNA GPU -OK
app.get('/info-gpu', (req,res) => {
  setGPUinfo();
  res.send(pcData.gpu);
});
// RETORNA INFORMACAO DO SISTEMA - OK
app.get('/info-os', (req,res) => {
  setInfoOS();
  res.send(pcData.os);
})

//RETORNA ARRAY USUARIOS -> OK
app.get('/info-users', (req,res) => {
  setUsers();
  res.send(pcData.users);
});

//RETORNA PROCESSOS -- COLOCAR SCHEDULER -> OK
app.get('/info-process', (req,res) => {
  setProcess();
  res.send(pcData.process);
});

// RETORNA DISK LAYOUT -> OK
app.get('/info-disk', (req,res) => {
  setDiskLayout();
  res.send(pcData.diskLayout);
});
// RETORNA fsSize -> OK
app.get('/info-fs', (req,res) => {
  setFileSystemSize();
  res.send(pcData.fsSize);
});

// RETORNA porcentagem de uso da CPU --> ATUALIZADO
app.get('/cpu-load', (req, res) => {
  setLoad();
  res.send(pcData.cpuLoad);
});







function actualTime () {
    const now = new Date();
    return time.format(now, 'DD/MM/YYYY - HH:mm:ss');
}


function setRAM() {
  si.mem().then((data) => {
    pcData.RAM = data;
  }).catch((error) => console.log(error));

}
function usedRam() {
  si.mem().then((data => {
    pcData.memory = data;
  })).catch(error => {console.log(error)});
    
    return pcData.memory;
}
function freeRam() {
  let free = null;
  si.mem().then((data => {
    free = data;
    console.log(data);
    console.log(free);
  })).catch(error => {console.log(error)});
  console.log(free);

    return free;
}
function totalRam() {
  si.mem().then((data => {
    pcData.memory = data;
  })).catch(error => {console.log(error)});

    return pcData.memory.total;
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

function usedCpu() {
  const valueObject = {};
  si.cpuCurrentSpeed()
  .then((data) => {
    setCpu(data);
  })
  .catch(error => console.error(error));

  return valueObject.cpu;
}
function setCpu(data){
  pcData.cpuCurrentSpeed = data;
}
function setCpuTemperature() {
  si.cpuTemperature().then((data) => {
    pcData.cpuTemperature = data;
  }).catch((error)=> console.log(error));
}
function setHardwareInfo() {
  si.system().then((data => {
    pcData.hardware = data;
  })).catch((error) => console.log(error));
}
function setBiosInfo() {
  si.bios().then((data)=>{
    pcData.bios = data;
  }).catch((error) => console.log(error));
}
function setMotherBoard() {
  si.baseboard().then((data) => {
    pcData.motherBoard = data;
  }).catch((error) => console.log(error));
}

function setRamInfo(){
  si.memLayout().then((data) => {
    pcData.ramInfo = data;
  }).catch((error) => console.log(error));
}
function setGPUinfo () {
  si.graphics().then((data) => {
    pcData.gpu = data;
  }).catch((error) => console.log(error));
}
function setInfoOS () {
  si.osInfo().then((data) => {
    pcData.os = data;
  }).catch((error) => console.log(error));
}
function setUsers () {
  si.users().then((data) => {
    pcData.users = data;
  }).catch((error) => console.log(error));
}
function setProcess() {
  si.processes().then((data) => {
    pcData.process = data;
  }).catch((error) => console.log(error));
}
function setDiskLayout () {
  si.diskLayout().then((data) => {
    pcData.diskLayout = data;
  }).catch((error) => console.log(error));
}
function setFileSystemSize() {
  si.fsSize().then((data) => {
    pcData.fsSize = data;
  }).catch((error) => console.log(error));

}
function cpuInfo() {
    si.cpu().then((data) => {
      pcData.cpuInfo = data;
    }).catch((error) => console.log(error));
}
function cpuPercentage() {
  os.cpuUsage((value) => {
    console.log(`${value}%%%%`);
  });

}
function setLoad(){
  si.currentLoad().then((data) => {
    pcData.cpuLoad = data;
  }).catch((error) => console.log(error));
}
