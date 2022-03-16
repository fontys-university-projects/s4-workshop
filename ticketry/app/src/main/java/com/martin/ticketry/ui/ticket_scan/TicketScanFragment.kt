package com.martin.ticketry.ui.ticket_scan

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.martin.ticketry.databinding.FragmentTicketScanBinding

class TicketScanFragment : Fragment() {

    private var _binding: FragmentTicketScanBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val ticketScanViewModel =
            ViewModelProvider(this).get(TicketScanViewModel::class.java)

        _binding = FragmentTicketScanBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val textView: TextView = binding.textTicketScan
        ticketScanViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}