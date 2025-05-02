import osUtils from "os-utils";
import fs from "fs";
import os from "os";

const POOLING_INTERVAL = 2000;

export function poolResouserces() {
  const staticData= getStaticData();
  console.log(staticData);
  console.log("Pooling resources...");
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const memUsage = getMemUsage();
    const storageData = getStorageData();

    console.log({
      cpuUsage,
      memUsage,
      storageData,
    });
  }, POOLING_INTERVAL);
}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage((v) => {
      resolve(v);
    });
  });
}

function getMemUsage() {
  return 1 - osUtils.freemem() / osUtils.totalmem();
}

function getStorageData() {
  // requires node 18
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}

export function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

  return {
    totalStorage,
    cpuModel,
    totalMemoryGB,
  };
}
