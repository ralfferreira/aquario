-- CreateView
CREATE VIEW "vw_feed_geral" AS
SELECT
  id,
  titulo,
  'publicacao' AS tipo,
  "criadoEm"
FROM "Publicacao"
UNION ALL
SELECT
  id,
  titulo,
  'projeto' AS tipo,
  "criadoEm"
FROM "Projeto"
UNION ALL
SELECT
  id,
  titulo,
  'vaga' AS tipo,
  "criadoEm"
FROM "Vaga";

-- CreateStoredProcedure
CREATE OR REPLACE FUNCTION sp_contar_contribuicoes_usuario(p_usuario_id TEXT)
RETURNS INTEGER AS $$
DECLARE
    total_contribuicoes INTEGER;
BEGIN
    SELECT INTO total_contribuicoes
        (SELECT COUNT(*) FROM "Publicacao" WHERE "autorId" = p_usuario_id) +
        (SELECT COUNT(*) FROM "Projeto" WHERE "criadorId" = p_usuario_id) +
        (SELECT COUNT(*) FROM "Vaga" WHERE "publicadorId" = p_usuario_id)
    ;
    RETURN total_contribuicoes;
END;
$$ LANGUAGE plpgsql;