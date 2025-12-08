export class UF {
  constructor() {
    this.connections = {};
    this.componentIds = new Set();
    this.componentId = 1;
  }

  find(n) {
    return this.connections[n];
  }

  union(f, t) {
    if (this.connected(f, t)) {
      return;
    }

    let fid = this.find(f);
    let tid = this.find(t);

    if (fid && tid) {
      // Path compress
      this.componentIds.delete(tid);
      for (let key of Object.keys(this.connections)) {
        if (this.connections[key] === tid) {
          this.connections[key] = fid;
        }
      }
    } else if (fid && !tid) {
      this.connections[t] = fid;
    } else if (!fid && tid) {
      this.connections[f] = tid;
    } else {
      this.connections[t] = this.componentId;
      this.connections[f] = this.componentId;

      this.componentIds.add(this.componentId);
      this.componentId++;
    }
  }

  connected(t, f) {
    let fid = this.find(f);
    let tid = this.find(t);
    return fid && tid && fid === tid;
  }

  count() {
    return this.componentIds.size
  }

  allSizes() {
    return Object.keys(this.connections).reduce((acc, key) => {
      let cid = this.connections[key];
      acc[cid] = acc[cid] ?? 0;
      acc[cid] += 1;
      return acc;
    }, {});
  }
}
