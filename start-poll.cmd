@echo off
cd /d "C:\Users\User\OneDrive\Desktop\Projects\Codex\summary-pdf-mu-dst\nextdst_69"
node .agents/skills/impeccable/scripts/live-poll.mjs --stream --ack-timeout=900000 > live-poll.log 2> live-poll-err.log
