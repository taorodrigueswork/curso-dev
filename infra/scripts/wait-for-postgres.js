const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout, stderr) {
    try {
      if (stdout.search("accepting connections") === -1) {
        process.stdout.write(".");
        checkPostgres();
        return;
      }

      console.log("\n✅ Postgres está pronto e aceitando conexões.");
    } catch (error) {
      console.error(`🛑 Error: ${error}`);
    }
  }
}

process.stdout.write("\n\n🛑 Aguardando Postgres aceitar conexões.");
checkPostgres();
