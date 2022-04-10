//
//  ContentView.swift
//  linage
//
//  Created by Martin on 05/04/2022.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Maps().ignoresSafeArea(edges: .top)
                .frame(height: 150)
            Campus_Avatar_Circle().offset(y: -130)
                .padding(.bottom, -130)
            Text("Eindhoven R10")
                .font(.title)
            Divider()
            VStack {
                HStack {
                    Text("Location").font(.title3)
                    Spacer()
                    Text("Racelsmolen 1").font(.caption).foregroundColor(.gray)
                }
                HStack {
                    Text("Open Hours").font(.title3)
                    Spacer()
                    VStack {
                        HStack {
                            Text("Mon - Thu:").font(.caption).foregroundColor(.gray)
                            Spacer()
                            Text("7:30AM - 6:30PM").font(.caption).foregroundColor(.gray)
                        }
                        HStack {
                            Text("Fri:").font(.caption).foregroundColor(.gray)
                            Spacer()
                            Text(" 7:30AM - 6:00PM").font(.caption).foregroundColor(.gray)
                        }
                        
                    }
                }
                VStack {
                    Text("Description").font(.title3)
                    Text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet mattis sapien. Integer sed ante euismod, aliquam risus in, varius tellus. ").font(.caption).foregroundColor(.gray)
                }
            }
            .padding()
            Spacer()
        }
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .previewInterfaceOrientation(.portrait)
    }
}
