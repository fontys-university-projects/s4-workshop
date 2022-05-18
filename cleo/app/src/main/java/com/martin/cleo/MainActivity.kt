package com.martin.cleo

import android.content.ContentValues.TAG
import android.graphics.Bitmap
import android.graphics.Color
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.CountDownTimer
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import com.google.zxing.BarcodeFormat
import com.google.zxing.MultiFormatWriter
import com.google.zxing.WriterException

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val button = findViewById<Button>(R.id.ticketsButton)
        button.setOnClickListener{
            setContentView(R.layout.activity_tickets)
        }

        val genQR: Button = findViewById(R.id.ticketButton)
        val qrImage: ImageView = findViewById(R.id.qrImage)
        val countdownText: TextView = findViewById(R.id.countdownText)
        genQR.setOnClickListener {
            genQRCode()

            object : CountDownTimer(15000, 1000) {

                override fun onTick(millisUntilFinished: Long) {
                    countdownText.text = (millisUntilFinished / 1000).toString()
                    genQR.visibility = View.GONE
                    countdownText.visibility = View.VISIBLE
                }

                override fun onFinish() {
                    genQR.visibility = View.VISIBLE
                    qrImage.setImageResource(R.drawable.ic_qr_placement)
                    countdownText.visibility = View.GONE
                }
            }.start()
        }
    }




        private fun getRandomString(length: Int) : String {
            val charset = ('a'..'z') + ('A'..'Z') + ('0'..'9')

            return List(length) { charset.random() }
                .joinToString("")
        }

        private fun genQRCode() {
            val qrImage: ImageView = findViewById(R.id.qrImage)
            val length = 10
            val randomString = getRandomString(length)
            val bitmap = generateQRCodeImage(randomString)
            qrImage.setImageBitmap(bitmap)
        }

        private fun generateQRCodeImage(text: String): Bitmap {
            val width = 600
            val height = 600
            val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
            val codeWriter = MultiFormatWriter()
            try {
                val bitMatrix = codeWriter.encode(text, BarcodeFormat.QR_CODE, width, height)
                for (x in 0 until width) {
                    for (y in 0 until height) {
                        bitmap.setPixel(x, y, if (bitMatrix[x, y]) Color.BLACK else Color.WHITE)
                    }
                }
            } catch (e: WriterException) { Log.d(TAG, "generateQRCode: ${e.message}") }
            return bitmap
        }
}


