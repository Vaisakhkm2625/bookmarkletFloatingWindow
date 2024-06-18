{ pkgs ? import <nixpkgs> {} }:

let
  brave = pkgs.brave;
in pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    web-ext
    brave
  ];

}
